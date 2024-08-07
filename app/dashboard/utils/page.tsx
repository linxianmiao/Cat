'use client';
import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import { parseCSV } from '@/app/lib/serverActions';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Row, Col, Upload, Alert, message } from 'antd';
const Textarea = Input.TextArea;

function convertArrayToCSV(ids: string[]) {
  // 将二维数组转换为CSV格式的字符串
  return (
    `达人用户名（请勿删除此行。每行一个用户名，最多 100 位达人。）,\n` +
    ids.join(',\n')
  );
}

const Utils = () => {
  const [csvData, setCsvData] = React.useState<any[]>([]);
  const [affiliateIds, setAffiliateIds] = React.useState<string[]>([]);
  const [info, setInfo] = React.useState<string>('');
  const [batchSize, setBatchSize] = React.useState<number>(100);

  const downloadCSV = (ids: string[]) => {
    let linkContainerEl = document.getElementById('download-links');

    for (let i = 0; i < ids.length; i += batchSize) {
      // 创建一个Blob对象，表示一个不可变的数据类文件对象
      const slicedIds = ids.slice(i, i + batchSize);
      const blob = new Blob([convertArrayToCSV(slicedIds)], {
        type: 'text/csv;charset=utf-8;',
      });
      let linkEl: HTMLAnchorElement | null = document.createElement(
        'a',
      ) as HTMLAnchorElement;
      linkEl.href = URL.createObjectURL(blob);
      linkEl.download = `达人ID.csv`;
      linkEl.style.visibility = 'hidden';
      linkEl.click();
      linkContainerEl?.appendChild(linkEl);
    }
    linkContainerEl?.replaceChildren();
  };
  const handleBeforeUpload = (file: File) => {
    const isCSV = file.type === 'text/csv';
    if (!isCSV) {
      message.error({
        content: '只能上传CSV文件',
      });
    }
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async function (e: ProgressEvent<FileReader>) {
      if (e.target?.result) {
        let csv = await parseCSV(e.target.result as string);
        let noIds: string[] = [];
        let ids: string[] = [];
        csv.forEach((record: { [key: string]: string }) => {
          if (record['达人ID']) {
            ids.push(record['达人ID']);
          } else {
            noIds.push(record['序号'] as string);
          }
        });
        let i = `共找到${ids.length}个达人ID\n${noIds.length}个达人没有ID\n预计生成${Math.ceil(ids.length / batchSize)}个表格\n`;
        if (noIds.length > 0) {
          i += `没有ID的达人序号: ${noIds.join(',')}\n`;
        }
        if (ids.length > 0) {
          i += `有ID的达人ID: \n ${ids.join(',\n')}\n`;
        }
        setInfo(i);
        setAffiliateIds(ids);
        setCsvData(csv);
      }
    };
  };

  const handleChangeBatchSize = (e: ChangeEvent<HTMLInputElement>) => {
    setBatchSize(parseInt(e.target.value));
  };

  const handleParseCSV = async () => {
    if (!csvData) return;
    try {
      downloadCSV(affiliateIds);
    } catch (error) {
      message.error({
        content: '下载失败, 请联系管理员',
      });
    }
  };

  return (
    <React.Fragment>
      <Alert
        showIcon={true}
        message={`使用说明: 从达人建联表格中下载表格为CSV格式，确保里面达人ID那一列叫做"达人ID"。然后点击Upload上传文件，等待解析。最后点击Download按钮下载。`}
        type="info"
      />

      <Row>
        <Col span={12}>
          <Upload
            maxCount={1}
            listType="picture-circle"
            beforeUpload={handleBeforeUpload}
          >
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Col>
      </Row>
      <Row>
        <Col span={12} md={{ span: 8 }}>
          <Input
            type="number"
            addonBefore="达人/表格"
            onChange={handleChangeBatchSize}
            value={batchSize.toString()}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Textarea disabled={true} value={info} rows={10} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button type="primary" onClick={handleParseCSV}>
            Dowload
          </Button>
        </Col>
      </Row>
      <div id="download-links"></div>
    </React.Fragment>
  );
};
export default Utils;
