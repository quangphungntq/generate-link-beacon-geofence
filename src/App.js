import "./styles.css";
import React, { useState } from "react";
import { Tabs, Form, Input, Button } from "antd";

const { TabPane } = Tabs;

const convertdDecimalToHex = (dec) => dec.toString(16);

export default function App() {
  const [formLayout, setFormLayout] = useState("horizontal");
  const [linkInput, setLinkInput] = useState("");
  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [linkUsingBeacon, setlinkUsingBeacon] = useState("");
  const [linkUsingGeofence, setlinkUsingGeofence] = useState("");

  function onChangeLink({ target: { value } }) {
    setLinkInput(value);
    console.log(linkInput);
  }

  function onChangeMajor({ target: { value } }) {
    setMajor(value);
  }

  function onChangeMinor({ target: { value } }) {
    setMinor(value);
  }

  function onChangeLatitude({ target: { value } }) {
    setLatitude(value + "");
  }

  function onChangeLongitude({ target: { value } }) {
    setLongitude(value + "");
  }

  const onFinishGenerateBeacon = (value) => {
    const convertMajor = convertdDecimalToHex(parseInt(major));
    const convertMinor = convertdDecimalToHex(parseInt(minor));
    setlinkUsingBeacon(`${linkInput}/${convertMajor}/${convertMinor}.xml`);
  };

  const onFinishGenerateGeofence = (value) => {
    const convertLatitude = convertdDecimalToHex(
      parseInt(latitude.replace(".", ""))
    );
    const convertLongitude = convertdDecimalToHex(
      parseInt(longitude.replace(".", ""))
    );
    setlinkUsingGeofence(
      `${linkInput}/${convertLatitude}/${convertLongitude}.xml`
    );
  };

  function callback(e) {
    // setLinkInput(value);
  }
  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4
          },
          wrapperCol: {
            span: 14
          }
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4
          }
        }
      : null;
  return (
    <div className="App" style={{}}>
      <h1>Gennerate link Beacon, Geofence</h1>
      <Form {...formItemLayout}>
        <Form.Item label="Link Generate">
          <Input onChange={onChangeLink} placeholder="Input link" />
        </Form.Item>
      </Form>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Beacon" key="1">
          <Form
            {...formItemLayout}
            initialValues={{
              remember: true
            }}
            onFinish={onFinishGenerateBeacon}
          >
            <Form.Item label="Major">
              <Input onChange={onChangeMajor} placeholder="Input Major" />
            </Form.Item>
            <Form.Item label="Minor">
              <Input onChange={onChangeMinor} placeholder="Input Minor" />
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
              <Button type="primary" htmlType="submit">
                Generate
              </Button>
            </Form.Item>
          </Form>
          <a href={linkUsingBeacon}>{linkUsingBeacon}</a>
        </TabPane>
        <TabPane tab="Geofence" key="2">
          <Form {...formItemLayout} onFinish={onFinishGenerateGeofence}>
            <Form.Item label="Latitude">
              <Input onChange={onChangeLatitude} placeholder="Input Latitude" />
            </Form.Item>
            <Form.Item label="Longitude">
              <Input
                onChange={onChangeLongitude}
                placeholder="Input Longitude"
              />
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
              <Button type="primary" htmlType="submit">
                Generate
              </Button>
            </Form.Item>
          </Form>
          <a href={linkUsingGeofence}>{linkUsingGeofence}</a>
        </TabPane>
      </Tabs>
    </div>
  );
}
