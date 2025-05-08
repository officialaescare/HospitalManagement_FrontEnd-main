// Feature component
import React from 'react';
import { useUserQuery } from '../../hooks/useUserQuery';
import UserCard from '../../components/UserCard';

const UserList = () => {
  const { data, isLoading } = useUserQuery();
  if (isLoading) return <div>Loading...</div>;
  return data.map(user => <UserCard key={user.id} user={user} />);
};

export default UserList;