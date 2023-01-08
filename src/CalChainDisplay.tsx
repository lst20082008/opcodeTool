import React, { useEffect } from 'react';
import { CalChain, CalNode } from './CalChain';

const CalChainDisplay = (props: {calChains: CalChain[], setCalChains: any}) => {
    const {calChains, setCalChains} = props;
    const AddCalChains = () => {
        let newCalChains = calChains.map(c => c);
        newCalChains.push(new CalChain());
        setCalChains(newCalChains);
    }
    const AddCalChainNode = (index: number) => {
        let newCalChains = calChains.map(c => c);
        newCalChains[index].pushNode(new CalNode(BigInt(0)));
        setCalChains(newCalChains);
    }
    const SetCalChainNodeOpcode = (chainIndex: number, nodeIndex: number, value: string) => {
        let newCalChains = calChains.map(c => c);
        newCalChains[chainIndex].nodeList[nodeIndex].value = value;
        setCalChains(newCalChains);
    }
    const SetCalChainNodeValue = (chainIndex: number, nodeIndex: number, value: string) => {
        let newCalChains = calChains.map(c => c);
        newCalChains[chainIndex].nodeList[nodeIndex].value = BigInt(value);
        setCalChains(newCalChains);
    }
    return <table><tbody>
        {
            calChains.map((calChain, index) => {
                return <tr key={`chains${index}`}>{calChain.nodeList.map((calNode, index2) => {
                    return <td key={`chains${index}nodes${index2}`}>
                        {
                            (index2 % 2 !== 0) ?
                            <select value={calNode.value as string}
                                onChange={(e) => SetCalChainNodeOpcode(index, index2, e.target.value)}>
                                <option>选择计算</option>
                                <option value='|'>|</option>
                                <option value='&'>&</option>
                                <option value='<'>&lt;&lt;</option>
                                <option value='>'>&gt;&gt;</option>
                            </select> :
                            <input type='text' value={calNode.value.toString()}
                                onChange={(e) => SetCalChainNodeValue(index, index2, e.target.value)} />
                        }
                        </td>
                })}<td><button onClick={() => AddCalChainNode(index)}>+line</button></td><td>0x{calChain.calc().toString(16)}</td></tr>
            })
        }
        <tr><td><button onClick={AddCalChains}>+col</button></td></tr>
    </tbody></table>;
}

export default CalChainDisplay;