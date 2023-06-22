import { PrismaClient, User } from '@prisma/client';
import { nsql_db } from '../Utils/Database/db.client';
import { ListUserFilters, ListUserResult, createBody, loginData, updateBody } from '../Types/Users/type';
const getPrismaInstance = (): PrismaClient['user'] => nsql_db.user

async function createUser(data: createBody) {
    try {
        return await getPrismaInstance().create({ data: data })
    } catch (error) {
        console.log(error)
    }
}

async function checkUserExist(data: createBody) {
    try {
        return await getPrismaInstance().findFirst({ where: { email: data.email } })
    } catch (error) {
        console.log(error)

    }
}

async function listUser(filters: ListUserFilters) {
    try {
        let where: any = {}
        let skip
        if (filters.offset) {
            skip = filters.offset === 0 ? 0 : (filters.offset - 1) * 10;
        }
        let count = skip === 0 ? 0 : filters.count ? filters.count : 0;

        if (filters.start_date && filters.end_date) {
            where['createdAt'] = {
                lte: filters.end_date,
                gte: filters.start_date,
            };
        }

        if (filters.filter) {

            if (filters.filter.state && filters.filter.state.length > 0) {
                where['state'] = { in: filters.filter.state };
            }
            if (filters.filter.city && filters.filter.city.length > 0) {
                where['city'] = { in: filters.filter.city };
            }

            if (filters.filter.search) {
                where['OR'] = [
                    {
                        first_name: {
                            contains: filters.filter.search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        last_name: {
                            contains: filters.filter.search,
                            mode: 'insensitive',
                        },
                    },
                ];
            }
        }

        const orderByData: Array<Object> = [];

        if (filters.sort) {
            // Splits the sort string by comma and creates an orderByData object for each field.
            const sortArray = filters.sort.split(',');
            for (let i = 0; i < sortArray.length; i++) {
                // Checks the field name and adds it to the orderByData object.
                if (
                    ['first_name', 'last_name', 'email', 'phone_no', 'password', 'state', 'city'].includes(
                        sortArray[i].slice(0, sortArray[i].length - 1).toString()
                    )
                ) {
                    const item: Record<string, string> = {}; // Specify the type of `item` as `Record<string, string>`
                    item[sortArray[i].slice(0, sortArray[i].length - 1).toString()] =
                        sortArray[i].slice(sortArray[i].length - 1, sortArray[i].length) === '+'
                            ? 'asc'
                            : 'desc';
                    orderByData.push(item);
                }
            }
        } else {
            orderByData.push({ createdAt: 'desc' });
        }

        if (count <= 0) {
            count = await getPrismaInstance().count({
                where: where,
            });
        }
        const data = await getPrismaInstance().findMany({
            where: where,
            orderBy: orderByData,
            skip: skip ? skip : 0,
            take: 10,
        }
        )
        return {
            data,
            pagination: {
                offset: filters.offset || 0,
                limit: 10,
                count: count,
            },
        };
        return await getPrismaInstance().findMany()
    } catch (error) {
        console.log(error)
    }
}

async function updateUser(data: Partial<User>, id: string) {
    try {
        return await getPrismaInstance().update({ data, where: { id } })
    } catch (error) {
        console.log(error)
    }
}

async function deleteUser(id: string) {
    try {
        return await getPrismaInstance().delete({ where: { id } })
    } catch (error) {
        console.log(error)
    }
}

async function userLogin(data: loginData) {
    try {
        return await getPrismaInstance().findFirst({ where: { email: data.email, password: data.password } })
    } catch (error) {
        console.log(error)
    }
}

export {
    createUser,
    listUser,
    updateUser,
    deleteUser,
    userLogin,
    checkUserExist
}