import { ROLE } from '../constants/role';

export const checkAdmin = (user) => user?.roleId === ROLE.ADMIN;
