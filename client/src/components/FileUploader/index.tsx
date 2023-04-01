import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload } from "antd";

const props: UploadProps = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  listType: "picture",
  beforeUpload(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = "green";
          ctx.textBaseline = "middle";
          ctx.font = "33px Arial";
          ctx.fillText("Ant Design", 20, 20);
          canvas.toBlob((result) => resolve(result as any));
          uploadFile(file);
        };
      };
    });
  },
};

const uploadFile = (file: any) => {
  var data = new FormData();
  data.append("file", file);

  fetch("http://localhost:8080/upload", {
    method: "POST",
    body: data,
  });
};

const FileUploader: React.FC = () => {
  return (
    <div>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Choose File</Button>
      </Upload>
    </div>
  );
};
export default FileUploader;
