System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, UITransform, Vec3, instantiate, ScrollItem, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, ScrollView;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfScrollItem(extras) {
    _reporterNs.report("ScrollItem", "./ScrollItem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfIScrollItemData(extras) {
    _reporterNs.report("IScrollItemData", "./ScrollItem", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      UITransform = _cc.UITransform;
      Vec3 = _cc.Vec3;
      instantiate = _cc.instantiate;
    }, function (_unresolved_2) {
      ScrollItem = _unresolved_2.ScrollItem;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7065bQQT7ZFpLs3PY3GWoNV", "ScrollView", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'UITransform', 'Label', 'Vec3', 'instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ScrollView", ScrollView = (_dec = ccclass('ScrollView'), _dec2 = property(Prefab), _dec3 = property(Node), _dec(_class = (_class2 = class ScrollView extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "scrollItem", _descriptor, this);

          _initializerDefineProperty(this, "content", _descriptor2, this);

          _initializerDefineProperty(this, "itemHeight", _descriptor3, this);

          // 每个item的高度
          this.items = [];
          // 存储创建的item节点
          this.itemCount = 0;
          // 需要创建的item总数
          this.viewHeight = 0;
          // 视口高度
          this.contentStartY = 0;
          // content初始Y位置
          this.totalDataCount = 20;
          // 总数据量
          this.dataList = [];
          // 存储所有数据
          this.lastFirstVisibleIndex = -1;
          // 添加这个属性来跟踪上一次的首个可见索引
          this.itemDataIndexMap = new Map();
        }

        // 添加新属性跟踪每个item当前显示的数据索引
        start() {
          // 生成模拟数据
          this.generateMockData(); // 初始化视口相关参数

          this.viewHeight = this.content.parent.getComponent(UITransform).height;
          this.itemCount = Math.ceil(this.viewHeight / this.itemHeight) + 1;
          this.contentStartY = this.content.position.y; // 设置content高度以适应所有数据

          const contentUI = this.content.getComponent(UITransform);
          contentUI.height = Math.max(this.totalDataCount * this.itemHeight, this.viewHeight); // 初始化item数据索引映射

          this.itemDataIndexMap = new Map(); // 创建初始item

          this.initItems();
        }

        initItems() {
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

        update(deltaTime) {
          // 检查并更新item位置
          this.updateItemPositions();
        }

        updateItemPositions() {
          const contentY = this.content.position.y;
          const offsetY = contentY - this.contentStartY; // 计算实际的滚动偏移量

          const scrollOffset = Math.abs(offsetY); // 计算当前第一个可见item的索引

          const firstVisibleIndex = Math.floor(scrollOffset / this.itemHeight);

          for (let i = 0; i < this.items.length; i++) {
            var _this$itemDataIndexMa;

            const item = this.items[i];
            const currentIndex = firstVisibleIndex + i; // 检查是否超出数据范围

            if (currentIndex >= this.totalDataCount) {
              item.active = false;
              continue;
            }

            item.active = true; // 设置item位置

            const posY = -currentIndex * this.itemHeight;
            item.position = new Vec3(item.position.x, posY, 0); // 获取当前item正在显示的数据索引

            const currentDataIndex = (_this$itemDataIndexMa = this.itemDataIndexMap.get(item)) != null ? _this$itemDataIndexMa : -1; // 只有当数据索引发生变化时才更新内容

            if (currentDataIndex !== currentIndex) {
              this.updateItemContent(item, currentIndex);
              this.itemDataIndexMap.set(item, currentIndex);
            }
          }
        }

        updateItemContent(item, index) {
          // 确保索引在有效范围内
          if (index < 0 || index >= this.totalDataCount) {
            return;
          }

          const data = this.dataList[index];
          const scrollItem = item.getComponent(_crd && ScrollItem === void 0 ? (_reportPossibleCrUseOfScrollItem({
            error: Error()
          }), ScrollItem) : ScrollItem);

          if (scrollItem && data) {
            scrollItem.updateData(data);
          }
        }

        generateMockData() {
          // 生成30个模拟数据
          for (let i = 0; i < 30; i++) {
            this.dataList.push({
              context: `这是第${i + 1}条数据内容`
            });
          } // 更新总数据量


          this.totalDataCount = this.dataList.length;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scrollItem", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "itemHeight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 60;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6aa573b3be4b247b55d07317532377154a96467f.js.map