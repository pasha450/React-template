// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  // FontSizeOutlined,
  TeamOutlined,
  LoadingOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
// icons
const icons = {
  // FontSizeOutlined,
  TeamOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Family  ',
      type: 'item',
      url: '/family',
      // icon: icons.FontSizeOutlined
    icon :TeamOutlined ,
    },
    {
      id: 'util-color',
      title: 'FamilyMembers',
      type: 'item',
      url: '/FamilyMembers',
      icon:AppstoreOutlined,
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/shadow',
      icon: icons.BarcodeOutlined
    }
  ]
};

export default utilities;
