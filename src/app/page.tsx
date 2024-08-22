"use client";

import { useState } from "react";
import { Table, Menu, Layout, Flex, Button, Space, Modal } from "antd";
import type { TableProps, MenuProps } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{ 
    margin: 0;
  }
`;

const { Content, Sider } = Layout;

const currencies: Currency[] = [
  {
    id: 1,
    title: "UAH",
    symbol: "₴",
  },
  {
    id: 2,
    title: "USD",
    symbol: "$",
  },
  {
    id: 3,
    title: "RUB",
    symbol: "₽",
  },
];

const dataSource = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  title: `Супер бонус №${i + 1}`,
  currency: currencies[Math.floor(Math.random() * 3)]?.title,
  percent: 150 + i,
  mindep: 100 + i,
  maxdep: 10000 + i * 100,
  wager: 10 + i,
  idle: [12, 100],
  playing: [2, 16],
  finished: [3, 25],
  loosed: [2, 16],
  expired: [5, 41],
  tags: ["player", "birthday"],
}));

const bonuesTemplate = {
  id: 500,
  title: `Супер бонус №500`,
  currency: currencies[2].title,
  percent: 200,
  mindep: 5000,
  maxdep: 5000000,
  wager: 25,
  idle: [50000, 100],
  playing: [24567, 49],
  finished: [13234, 26],
  loosed: [11111, 22],
  expired: [1088, 2],
  tags: ["new"],
};

function getSymbol(currency: Currency["title"]) {
  return currencies.find((item) => item.title === currency)?.symbol;
}
function formatNumber(value: number) {
  return value.toLocaleString("he");
}

const columns: TableProps["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    fixed: "left",
    width: 50,
    onFilter: (value, record) => record.id.startsWith(value as string),
    filterSearch: true,
  },
  {
    title: "Теги",
    dataIndex: "tags",
    ellipsis: true,
    width: "10%",
    render: (a) => (
      <Flex gap={8}>
        {a.map((item: any) => (
          <div
            style={{
              padding: "0 4px",
              border: "1px solid gray",
              fontSize: 12,
            }}
          >
            {item}
          </div>
        ))}
      </Flex>
    ),
  },
  { title: "Название", dataIndex: "title", ellipsis: true, width: "20%" },
  { title: "Валюта", dataIndex: "currency", width: 80 },
  {
    title: "Бонус",
    children: [
      {
        title: "Процент",
        dataIndex: "percent",
        sorter: (a, b) => a.percent - b.percent,
        render: (value) => <span>{value}%</span>,
        width: 100,
      },
      {
        title: "Мин. деп",
        dataIndex: "mindep",
        width: 120,
        sorter: (a, b) => a.mindep - b.mindep,
        render: (value, record) => (
          <span>
            {formatNumber(+value)}
            {getSymbol(record.currency)}
          </span>
        ),
      },
      {
        title: "Макс. деп",
        dataIndex: "maxdep",
        sorter: (a, b) => a.maxdep - b.maxdep,
        width: 120,
        render: (value, record) => (
          <span>
            {formatNumber(+value)}
            {getSymbol(record.currency)}
          </span>
        ),
      },
      {
        title: "Вейджер",
        dataIndex: "wager",
        sorter: (a, b) => a.wager - b.wager,
        width: 80,
        render: (a) => <span>x{a}</span>,
      },
    ],
  },
  {
    title: "Статистика",
    children: [
      {
        title: "Получено",
        width: 100,
        dataIndex: "idle",
        render: (a) => (
          <Flex justify="space-between">
            <span>{a[0]}</span>
            <span>{a[1]}%</span>
          </Flex>
        ),
      },
      {
        title: "Играют",
        width: 100,
        dataIndex: "playing",
        render: (a) => (
          <Flex justify="space-between">
            <span>{a[0]}</span>
            <span>{a[1]}%</span>
          </Flex>
        ),
      },
      {
        title: "Завершены",
        width: 100,
        dataIndex: "finished",
        render: (a) => (
          <Flex justify="space-between">
            <span>{a[0]}</span>
            <span>{a[1]}%</span>
          </Flex>
        ),
      },
      {
        title: "Проиграны",
        width: 100,
        dataIndex: "loosed",
        render: (a) => (
          <Flex justify="space-between">
            <span>{a[0]}</span>
            <span>{a[1]}%</span>
          </Flex>
        ),
      },
      {
        title: "Просрочены",
        width: 110,
        dataIndex: "expired",
        render: (a) => (
          <Flex justify="space-between">
            <span>{a[0]}</span>
            <span>{a[1]}%</span>
          </Flex>
        ),
      },
    ],
  },
  {
    key: "action",
    fixed: "right",
    width: 50,
    render: () => (
      <Flex gap={10}>
        <a>
          <EditOutlined />
        </a>
        <a style={{ color: "red" }}>
          <DeleteOutlined />
        </a>
      </Flex>
    ),
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([...dataSource]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setData([...data, bonuesTemplate]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <GlobalStyle />
      <Layout hasSider style={{ minHeight: "100vh" }}>
        <Sider theme="light" style={siderStyle}>
          <p style={{ textAlign: "center" }}>Admin (@lomeat)</p>
          <Menu
            defaultSelectedKeys={["g1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout style={{ marginInlineStart: 200 }}>
          <Content
            style={{
              margin: "16px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Space>
              <Button type="primary" onClick={showModal}>
                Создать депозитный бонус
              </Button>
              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Отменить
                  </Button>,
                  <Button key="submit" type="primary" onClick={handleOk}>
                    Создать
                  </Button>,
                ]}
              >
                <p>Здесь должна быть форма</p>
              </Modal>
            </Space>
            <Table
              bordered
              size="small"
              dataSource={data}
              columns={columns}
              pagination={false}
              scroll={{
                x: 1000,
                y: "90vh",
              }}
            />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

type Currency = {
  id: number;
  title: string;
  symbol: string;
};

const items: MenuProps["items"] = [
  {
    key: "sub1",
    label: "Бонусы",
    icon: <MailOutlined />,
    children: [
      {
        key: "g1",
        label: "Депозитный",
      },
      {
        key: "g2",
        label: "Бездепозитный",
      },
      {
        key: "g3",
        label: "Фриспины",
      },
      {
        key: "g4",
        label: "Промокоды",
      },
      {
        key: "g5",
        label: "Кэшбек",
      },
    ],
  },
  {
    key: "sub2",
    label: "Просто пример",
    icon: <AppstoreOutlined />,
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "7", label: "Option 7" },
          { key: "8", label: "Option 8" },
        ],
      },
    ],
  },
];

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};
