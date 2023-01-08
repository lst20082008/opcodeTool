export class CalNode {
    value: bigint | string | CalChain;

    constructor(value: bigint | string) {
        this.value = value;
    }
}

export class CalChain {
    nodeList: CalNode[];

    constructor() {
        this.nodeList = new Array<CalNode>();
    }

    calc(): bigint {
        console.warn('calc', this.nodeList);
        if (this.nodeList.length === 0) {
            return BigInt(0);
        }
        let result: bigint = this.nodeList[0].value as unknown as bigint;
        console.warn('init number:', result.toString(16));
        for (let i = 1; i < this.nodeList.length; i++) {
            if (typeof(this.nodeList[i].value) === 'string') {
                console.warn('continue;');
                continue;
            }
            let newNumber: bigint;
            if (typeof(this.nodeList[i].value) === typeof(CalChain)) {
                let newNodeVal = this.nodeList[i].value as unknown as CalChain;
                newNumber = newNodeVal.calc();
            } else {
                let newNodeVal = this.nodeList[i].value as unknown as bigint;
                newNumber = newNodeVal;
            }
            console.warn('new number:', newNumber.toString(16));
            let preOpcode = this.nodeList[i - 1].value as unknown as string;
            console.warn('preOpcode:', preOpcode);
            switch (preOpcode) {
                case '|':
                    console.warn(`n1:${result.toString(16)} | n2:${newNumber.toString(16)}`);
                    result = BigInt.asUintN(64, result | newNumber);
                    continue;
                case '&':
                    result = BigInt.asUintN(64, result & newNumber);
                    continue;
                case '<':
                    result = BigInt.asUintN(64, result << newNumber);
                    continue;
                case '>':
                    result = BigInt.asUintN(64, result >> newNumber);
                    continue;
            }
        }
        return result;
    }

    pushNode(node: CalNode): void {
        this.nodeList.push(node);
    }

    deleteNode(index: number): boolean {
        if (this.nodeList.length <= index) {
            return false;
        }
        // the index will be removed
        this.nodeList.splice(index, 1);
        return true;
    }

    addNode(index: number, node: CalNode): boolean {
        if (this.nodeList.length < index) {
            return false;
        }
        // node will be append before the index
        // [xx, xx, node, index, xx, xx]
        this.nodeList.splice(index, 0, node);
        return true;
    }

    toString(): string {
        return 'calChain';
    }
}