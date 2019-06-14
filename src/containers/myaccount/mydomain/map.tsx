/**
 * 域名交易
 */
import * as React from 'react';
import Button from '@/components/Button';
import './index.less';
import { observer } from 'mobx-react';
import { IMydomainProps } from '../interface/mydomain.interface';
import Hint from '@/components/hint/index';

@observer
export default class DomainMap extends React.Component<IMydomainProps> {
    public render()
    {
        return (
            <div className="domain-edit-wrapper">
                <div className="domain-edit-content">
                    <div className="domain-edit-title">
                        <h3>映射地址</h3>
                    </div>
                    <div className="domain-edit-line">
                        <div className="edit-line-left">
                            域名
                        </div>
                        <div className="edit-line-right">
                            <strong>sdf.neo</strong>
                        </div>
                    </div>
                    <div className="domain-edit-line edit-small">
                        <div className="edit-line-left">
                            当前映射地址
                        </div>
                        <div className="edit-line-right">
                            <strong className="orange-text">AJzoeKrj7RHMwSrPQDPdv61ciVEYpmhkjk</strong>
                        </div>
                    </div>
                    <div className="domain-edit-line edit-small">
                        <div className="edit-line-left">
                            映射地址
                        </div>
                        <div className="edit-line-right">
                            <input type="text" className="edit-input"/>
                            <Hint text="如不填写地址则视为清空映射地址" />
                        </div>
                    </div>
                    <div className="domain-edit-btn-wrapper">
                        <Button text="取消" btnColor='white-btn' style={{'marginRight':'30px'}} onClick={this.handleToCloseTransfer} />
                        <Button text="修改" onClick={this.handleToTransfer} btnColor="gray-btn" />
                    </div>
                </div>
            </div>
        )
    }
    // 转让域名确认 todo
    private handleToTransfer = () =>
    {
        
        this.handleToCloseTransfer();
    }
    // 关闭
    private handleToCloseTransfer = () =>
    {
        this.props.mydomain.showEditNum = 0;
    }

}