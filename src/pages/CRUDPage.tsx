import { useEffect } from "react";
import {
  Button,
  Flex,
  Input,
  Modal,
  Form,
  Pagination,
  Space,
  Table,
} from "antd";
import { LIMIT } from "../constants";
import useSkill from "../store/skill";
import Skill from "../types/skill";
import type { ColumnsType } from "antd/es/table";
import request from "../server";

const CRUDPage = () => {
  const {
    user,
    skills,
    loading,
    total,
    page,
    isModalOpen,
    modalLoading,
    selected,
    search,
    setSearch,
    getSkills,
    setPage,
    showModal,
    controlModal,
    setSelected,
    setModalLoading,
  } = useSkill();

  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setModalLoading(true);
      const values = await form.validateFields();
      if (selected === null) {
        await request.post("skills", values);
      } else {
        await request.put(`skills/${selected}`, values);
      }
      getSkills();
      controlModal(false);
      form.resetFields();
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    getSkills();
  }, [getSkills, user]);

  const editSkill = async (id: string) => {
    const { data } = await request.get(`skills/${id}`);
    form.setFieldsValue(data);
    controlModal(true);
    setSelected(id);
  };

  const deleteSkill = async (id: string) => {
    await request.delete(`skills/${id}`);
    getSkills();
  };

  const columns: ColumnsType<Skill> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Fullname",
      render: (_, row) =>
        `${row?.user?.firstName ?? ""} ${row?.user?.lastName ?? ""}`,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editSkill(id)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => deleteSkill(id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>User Id: {user?._id}</h1>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" gap={36} align="center">
            <h1>Skills ({total})</h1>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button onClick={() => showModal(form)} type="dashed">
              Add skill
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        dataSource={skills}
        columns={columns}
      />

      {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={page}
          onChange={(page) => setPage(page)}
        />
      ) : null}
      <Modal
        title="Category data"
        maskClosable={false}
        confirmLoading={modalLoading}
        okText={selected === null ? "Add skill" : "Save skill"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => controlModal(false)}
      >
        <Form
          name="category"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Form.Item<Skill>
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<Skill>
            label="Percent"
            name="percent"
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
  );
};

export default CRUDPage;
