import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

  },
  {
    title: 'Manage Your Box',
    path: '#',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Accepted Requests',
        path: '/viewAllAcceptedRequests',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Pending Requests',
        path: '/viewAllRequests',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Add Item',
    path: '/addItem',
    icon: <IoIcons.IoMdAddCircle />
  },
  {
    title: 'Items',
    path: '/viewAllItems',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Your Added Items',
    path: '/viewAllUserItems',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Your Requests',
    path: '/viewAllRequestsByUser',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Login',
    path: '/login',
    icon: <IoIcons.IoMdLogIn />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Register',
    path: '/register',
    icon: <FaIcons.FaRegRegistered />
  },

];
