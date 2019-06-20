<template>
  <Panel class="latest_actions" panelTitle="Latest Actions">
    <div class="list">
      <div class="row" v-for="(action, index) in data" :key="index">
        <div class="line">
          <span class="top" />
          <span class="circle" />
          <span class="bottom" />
        </div>
        <div class="item">
          <div class="info">
            <div class="top">
              <div class="block_num" :title="action.block_num | numberFormat">
                {{ action.block_num | numberFormat }}
              </div>
              <div class="action_type">[{{ action.name }}]</div>
            </div>
            <div class="bottom" v-if="action.data">
              <template v-if="action.name === 'transfer'">
                <div class="data">
                  <span class="transfer">
                    <AccountLink :name="action.data.from" />
                    <span style="color: #3F3755">→</span>
                    <AccountLink :name="action.data.to" />
                  </span>
                  <span class="memo">{{ action.data.memo }}</span>
                </div>
                <div class="quantity">{{ action.data.quantity }}</div>
              </template>
              <template v-else>
                <div class="memo_data" :title="JSON.stringify(action.data)">
                  {{ JSON.stringify(action.data) }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import AccountLink from "@/components/AccountLink";

export default {
  name: "LatestActions",
  components: { AccountLink, Panel },
  props: {
    data: Array
  }
};
</script>

<style scoped lang="less">
@import "~@/assets/style/mixins.less";

.latest_actions {
  width: 640px;
  height: 495px;

  .list {
    display: flex;
    align-items: stretch;
    flex-direction: column;

    .row {
      height: 70px;
      background: rgba(255, 255, 255, 0);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      &:not(:last-child) {
        .item {
          box-shadow: 0 1px 0 0 #eaedf3;
        }
      }
      &:first-child {
        .line {
          .top {
            visibility: hidden;
          }
        }
      }
      &:last-child {
        .line {
          .bottom {
            visibility: hidden;
          }
        }
      }
      .line {
        width: 9px;
        display: flex;
        align-items: center;
        flex-direction: column;

        .top {
          width: 1px;
          height: 20px;
          background: #eaedf3;
        }

        .circle {
          width: 10px;
          border-radius: 50%;
          background: #34aa44;
          height: 10px;
        }

        .bottom {
          width: 1px;
          height: 40px;
          background: #eaedf3;
        }
      }

      .item {
        padding: 16px 0;
        width: 540px;
        flex-shrink: 0;
        display: flex;
        align-items: center;

        .info {
          flex-grow: 1;
          min-width: 0;
          .top,
          .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .top {
            .block_num {
              /*cursor: pointer;*/
              .text("tiny", "empher", "NunitoSans-Regular");
              flex-grow: 1;
              .text-ellipsis();
            }

            .action_type {
              margin-left: 8px;
              .text("text", "dark", "NunitoSans-Regular");
              flex-shrink: 0;
            }
          }

          .bottom {
            margin-top: 4px;
            .memo_data {
              .text-ellipsis();
              .text("tiny", "light", "NunitoSans-Regular");
            }

            .data {
              flex-grow: 1;
              min-width: 0;
              display: flex;
              align-items: center;

              .transfer {
                .text("text", "empher", "NunitoSans-Regular");
                flex-shrink: 0;
              }

              .memo {
                margin-left: 4px;
                flex-grow: 1;
                min-width: 0;
                .text-ellipsis();
                .text("tiny", "light", "NunitoSans-Regular");
              }
            }

            .quantity {
              margin-left: 8px;
              flex-shrink: 0;
              .text("tiny", "dark", "NunitoSans-Regular");
            }
          }
        }

        .detail {
          margin-left: 30px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          /*cursor: pointer;*/

          .circle {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #9ea0a5;

            + .circle {
              margin-left: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
