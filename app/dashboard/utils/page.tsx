'use client';
import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import { parseCSV } from '@/app/lib/serverActions';
import { Button, Input } from 'antd';
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async function (e: ProgressEvent<FileReader>) {
        if (e.target?.result) {
          let csv = await parseCSV(e?.target?.result as string);
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
    }
  };

  const handleChangeBatchSize = (e: ChangeEvent<HTMLInputElement>) => {
    setBatchSize(parseInt(e.target.value));
  };

  const handleParseCSV = async () => {
    if (!csvData) return;
    try {
      downloadCSV(affiliateIds);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <React.Fragment>
      <div className="flex min-h-screen flex-col items-start py-2">
        <input
          type="file"
          multiple={true}
          onChange={handleFileChange}
          className="mb-4"
        />
        <Input
          type="number"
          min={50}
          max={100}
          className="max-w-xs"
          onChange={handleChangeBatchSize}
          value={batchSize.toString()}
        />
        <Textarea disabled={true} value={info} rows={10}/>
        <Button type='primary' onClick={handleParseCSV}>Dowload</Button>
        <div id="download-links"></div>
      </div>
    </React.Fragment>
  );
};
export default Utils;
