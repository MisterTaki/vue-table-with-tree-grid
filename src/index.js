import ZkTable from './Table/Table';
import Tooltip from './Table/utils/tooltip-directive';

ZkTable.install = (Vue) => {
  Vue.component(ZkTable.name, ZkTable);
  Vue.use(Tooltip);
};

export default ZkTable;
