import { FC } from 'react';

import { ChildrenContainer } from '../models/container.model';

const AppContainer: FC<ChildrenContainer> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

export default AppContainer;
