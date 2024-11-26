import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;


export interface IScrollItemData {
    context : string;
}

@ccclass('ScrollItem')
export class ScrollItem extends Component {

    @property(Label)
    label : Label = null;

    start() {

    }

    update(deltaTime: number) {
        
    }

    public updateData (data : IScrollItemData) : void {
        this.label.string = data.context;
    }
}

