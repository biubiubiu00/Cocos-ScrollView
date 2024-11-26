import { _decorator, Component, Node, Prefab, UITransform, Label, Vec3, instantiate } from 'cc';
import { ScrollItem, IScrollItemData } from './ScrollItem';
const { ccclass, property } = _decorator;

@ccclass('ScrollView')
export class ScrollView extends Component {

    @property(Prefab)
    scrollItem : Prefab = null;

    @property(Node)
    content : Node = null;

    @property
    itemHeight: number = 60; // 每个item的高度

    private items: Node[] = []; // 存储创建的item节点
    private itemCount: number = 0; // 需要创建的item总数
    private viewHeight: number = 0; // 视口高度
    private contentStartY: number = 0; // content初始Y位置
    private totalDataCount: number = 20; // 总数据量
    private dataList: IScrollItemData[] = []; // 存储所有数据
    private lastFirstVisibleIndex: number = -1; // 添加这个属性来跟踪上一次的首个可见索引
    private itemDataIndexMap: Map<Node, number> = new Map(); // 添加新属性跟踪每个item当前显示的数据索引

    start() {
        // 生成模拟数据
        this.generateMockData();
        
        // 初始化视口相关参数
        this.viewHeight = this.content.parent.getComponent(UITransform).height;
        this.itemCount = Math.ceil(this.viewHeight / this.itemHeight) + 1;
        this.contentStartY = this.content.position.y;
        
        // 设置content高度以适应所有数据
        const contentUI = this.content.getComponent(UITransform);
        contentUI.height = Math.max(this.totalDataCount * this.itemHeight, this.viewHeight);
        
        // 初始化item数据索引映射
        this.itemDataIndexMap = new Map();
        
        // 创建初始item
        this.initItems();
    }

    private initItems() {
        // 创建满足视口显示的item数量
        for (let i = 0; i < this.itemCount; i++) {
            const item = instantiate(this.scrollItem);
            this.content.addChild(item);
            item.position = new Vec3(0, -i * this.itemHeight, 0);
            this.items.push(item);
            this.updateItemContent(item, i);
            this.itemDataIndexMap.set(item, i);
        }
    }

    update(deltaTime: number) {
        // 检查并更新item位置
        this.updateItemPositions();
    }

    private updateItemPositions() {
        const contentY = this.content.position.y;
        const offsetY = contentY - this.contentStartY;
        
        // 计算实际的滚动偏移量
        const scrollOffset = Math.abs(offsetY);
        // 计算当前第一个可见item的索引
        const firstVisibleIndex = Math.floor(scrollOffset / this.itemHeight);
        
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const currentIndex = firstVisibleIndex + i;
            
            // 检查是否超出数据范围
            if (currentIndex >= this.totalDataCount) {
                item.active = false;
                continue;
            }
            
            item.active = true;
            // 设置item位置
            const posY = -currentIndex * this.itemHeight;
            item.position = new Vec3(item.position.x, posY, 0);
            
            // 获取当前item正在显示的数据索引
            const currentDataIndex = this.itemDataIndexMap.get(item) ?? -1;
            
            // 只有当数据索引发生变化时才更新内容
            if (currentDataIndex !== currentIndex) {
                this.updateItemContent(item, currentIndex);
                this.itemDataIndexMap.set(item, currentIndex);
            }
        }
    }

    private updateItemContent(item: Node, index: number) {
        // 确保索引在有效范围内
        if (index < 0 || index >= this.totalDataCount) {
            return;
        }
        
        const data = this.dataList[index];
        const scrollItem = item.getComponent(ScrollItem);
        if (scrollItem && data) {
            scrollItem.updateData(data);
        }
    }

    private generateMockData() {
        // 生成30个模拟数据
        for (let i = 0; i < 30; i++) {
            this.dataList.push({
                context: `这是第${i + 1}条数据内容`
            });
        }
        // 更新总数据量
        this.totalDataCount = this.dataList.length;
    }
}

