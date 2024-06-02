import { useEffect, useState } from 'react';
import { ROLE } from '../constants/role';

export const useCheckAdmin = (user) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    user?.roleId === ROLE.ADMIN ? setIsAdmin(true) : setIsAdmin(false);
  }, [user]);

  return isAdmin;
};
