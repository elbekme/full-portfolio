import React, { useEffect, Fragment, ChangeEvent } from "react";
import { Form, Input, Modal } from "antd";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { toast } from 'react-toastify';

import request from "../server/index";
import "./skills.css";
import useMessage from "../store/message";
import Message from "../types/message";
import MessageCard from "../components/card/MessageCard";

const MessagePage: React.FC = () => {
  const {
    message,
    messages,
    loading,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    search,
    setSearch,
    getMessages,
    setPage,
    showModal,
    controlModal,
    setSelected,
    setModalLoading,
  } = useMessage();
  const userId = localStorage.getItem("PORTFOLIO_USER")
  ? JSON.parse(localStorage.getItem("PORTFOLIO_USER") || "")
  : null;
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        values.whom = userId?._id;
        await request.post("messages", values);
        toast.success('Success add message!');
      } else {
        await request.put(`messages/${selected}`, values);
        toast.success('Success update message!');
      }
      getMessages();
      controlModal(false);
      form.resetFields();
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, [getMessages, message]);

  const handlePageChange = (event: ChangeEvent<unknown>, newPage: number): void => {
    setPage(newPage);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const deleteMessage = async (id: string): Promise<void> => {
    await request.delete(`messages/${id}`);
    getMessages();
    toast.success('Success delete message!');
  };

  const editMessage = async (id: string): Promise<void> => {
    const { data } = await request.get(`messages/${id}`);
    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  };

  return (
    <Fragment>
      <div>
        <Typography variant="h3" align="center" gutterBottom>
          Message {total}
        </Typography>
        <Grid container justify="flex-end" spacing={1} alignItems="center">
          <Grid item xs={6} sm={4} md={3}>
            <TextField
              label="Search messages"
              variant="outlined"
              value={search}
              onChange={handleSearchChange}
              fullWidth
              className="search"
            />
          </Grid>
          <Grid item xs={6} sm={2} md={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => showModal(form)}
              fullWidth
            >
              Add Message
            </Button>
          </Grid>
        </Grid>
        <br />
        <div className="component-card">
          {loading ? (
            <div className="loader"></div>
          ) : (
            messages.map((message: Message) => (
              <MessageCard
                key={message._id}
                message={message}
                // userId={userId}
                deleteMessage={deleteMessage}
                editMessage={editMessage}
              />
            ))
          )}
        </div>
        <br />
        <Pagination
          count={Math.ceil(total / 10)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />

        <Modal
          title="Message data"
          maskClosable={false}
          confirmLoading={modalLoading}
          okText={selected === null ? "Add message" : "Save message"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => controlModal(false)}
        >
          <Form
            name="message"
            autoComplete="off"
            form={form}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: 600,
              position: "relative",
              height: "auto",
              boxShadow: "none",
            }}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please fill!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="User"
              name="user"
              rules={[
                {
                  required: true,
                  message: "Please fill!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[
                {
                  required: true,
                  message: "Please fill!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Fragment>
  );
};

export default MessagePage;