"use client";

import styled from "styled-components";
import { Steps, Timeline } from "antd";
import type { StepsProps, TimelineProps } from "antd";

const steps: StepsProps["items"] = [
  { description: "December 2023", title: "PingWin" },
  { description: "March 2023", title: "JetTon" },
  { description: "October 2021", title: "2H Stellar" },
];

const times: TimelineProps["items"] = [
  { label: "December 2023", children: "PingWin" },
  { label: "March 2023", children: "JetTon", color: "gray" },
  { label: "October 2021", children: "2H Stellar", color: "gray" },
];

export default function Home() {
  return (
    <Body>
      <Wrapper>
        <Steps direction="vertical" items={steps} />
        <Timeline mode="left" items={times} />
      </Wrapper>
    </Body>
  );
}

const Div = styled.div``;

const Body = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const Wrapper = styled.div`
  min-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.1);
`;
