<template>
  <a-tabs v-model="activeTab" class="info_tab">
    <a-tab-pane tab="ACTIONS INFO" key="actions">
      <BaseTable
        :columns="actionsColumns"
        :data="actions"
        class="actions_table"
      />
    </a-tab-pane>
    <a-tab-pane tab="TOKEN TRANSFER" key="token_transfer">
      <BaseTable
        :columns="tokenTransferColumns"
        :data="transferActions"
        class="token_transfer_table"
      />
    </a-tab-pane>
    <a-tab-pane tab="ACTIONS (RAW DATA)" key="actions_raw_data  ">
      <vue-json-pretty :showLine="false" :data="actions" />
    </a-tab-pane>
    <a-tab-pane :tab="`PERMISSIONS (${permissions.length})`" key="permissions">
      <BaseTable
        :columns="permissionColumns"
        :data="permissions"
        class="permission_table"
      />
    </a-tab-pane>
    <a-tab-pane
      :tab="`CONTROLLED ACCOUNTS (${controlledAccounts.length})`"
      key="controlled_accounts"
    >
      <div class="controlled_accounts">
        <AccountLink
          v-for="(acc, index) in controlledAccounts"
          :key="index"
          :name="acc"
          class="controlled_account"
        />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import Moment from "moment";
import BaseTable from "@/components/BaseTable";
import VueJsonPretty from "vue-json-pretty";
import AccountLink from "@/components/AccountLink";

export default {
  name: "InfoTabs",
  components: { AccountLink, BaseTable, VueJsonPretty },
  props: {
    account: Object,
    actions: Array,
    controlledAccount: Object
  },
  data() {
    return {
      activeTab: "actions",

      actionsColumns: [
        {
          key: "index",
          label: "#",
          width: 50,
          render(h, val, row, index) {
            return index + 1;
          }
        },
        {
          key: "tx_id",
          label: "Tx id",
          render(h, val, row) {
            return row?.action_trace?.trx_id;
          },
          width: 180
        },
        {
          key: "createdAt",
          label: "Date",
          render(h, val, row) {
            return Moment(row?.createdAt).format("MMMM Do YYYY, h:mm:ss a");
          },
          width: 200
        },
        {
          key: "name",
          label: "Name",
          render(h, val, row) {
            return [
              <span class="action_account">
                {row?.action_trace?.act?.account}
              </span>,
              <span>-</span>,
              <span class="action_name">{row?.action_trace?.act?.name}</span>
            ];
          },
          width: 200
        },
        {
          key: "action",
          label: "Action data",
          render: (h, val, row) => {
            const action = row?.action_trace?.act;
            let res;
            if (action.name === "transfer") {
              res = (
                <div class="action_data">
                  <div class="transfer">
                    <AccountLink name={action.data.from} />
                    <span style="color: #3F3755">→</span>
                    <AccountLink name={action.data.to} />
                  </div>
                  <div class="bottom">
                    <span class="memo">{action.data.memo}</span>
                    <span class="quantity">{action.data.quantity}</span>
                  </div>
                </div>
              );
            } else {
              const memo = action ? JSON.stringify(action.data) : "";
              res = (
                <div class="memo_data" title={memo}>
                  {memo}
                </div>
              );
            }
            return res;
          },
          width: 380
        }
      ],
      tokenTransferColumns: [
        {
          key: "time",
          label: "Time",
          width: 110,
          render(h, val, row) {
            const time = Moment(row?.createdAt);
            return [
              <div>{time.format("MMMM Do YYYY")}</div>,
              <div>{time.format("h:mm:ss a")}</div>
            ];
          }
        },
        {
          key: "direction",
          label: "Direction",
          render: (h, val, row) => {
            const direction =
              row?.action_trace?.act?.data?.to === this.account?.account_name;
            return direction ? "In" : "Out";
          },
          width: 100
        },
        {
          key: "from",
          label: "From",
          render: (h, val, row) => {
            console.log(row);
            return <AccountLink name={row?.action_trace?.act?.data?.from} />;
          },
          width: 100
        },
        {
          key: "to",
          label: "To",
          render: (h, val, row) => {
            return <AccountLink name={row?.action_trace?.act?.data?.to} />;
          },
          width: 100
        },
        {
          key: "memo",
          label: "Memo",
          render: (h, val, row) => {
            return row?.action_trace?.act?.data?.memo;
          },
          width: 320
        },
        {
          key: "quantity",
          label: "Quantity",
          render(h, val, row) {
            return row?.action_trace?.act?.data?.quantity;
          },
          width: 130
        },
        {
          key: "tx_id",
          label: "Tx id",
          render(h, val, row) {
            return row?.action_trace?.trx_id;
          },
          width: 150
        }
      ],
      permissionColumns: [
        {
          key: "perm_name",
          label: "Permission",
          width: 160
        },
        {
          key: "address",
          label: "Account/Address",
          render(h, val, row) {
            const ele = [];
            if (row?.required_auth?.keys?.length) {
              ele.push(
                <div class="key">{row?.required_auth?.keys[0]?.key}</div>
              );
            }
            if (row?.required_auth?.accounts?.length) {
              row?.required_auth?.accounts.forEach(acc => {
                ele.push(
                  <div class="account">
                    <AccountLink name={acc?.permission?.actor} class="actor" />
                    <span class="weight">{acc?.weight}</span>
                  </div>
                );
              });
            }
            return ele;
          },
          width: 530
        },
        {
          key: "threshold",
          label: "Threshold",
          render(h, val, row) {
            return row?.required_auth?.threshold;
          },
          width: 160
        },
        {
          key: "weight",
          label: "Weight",
          render(h, val, row) {
            return row?.required_auth?.keys[0]?.weight;
          },
          width: 160
        }
      ]
    };
  },
  computed: {
    transferActions() {
      if (!this.actions) return null;
      return this.actions.filter(
        action => action?.action_trace?.act?.name === "transfer"
      );
    },
    permissions() {
      return this.account?.permissions || [];
    },
    controlledAccounts() {
      return this.controlledAccount?.controlled_accounts || [];
    }
  },
  methods: {}
};
</script>

<style scoped lang="less">
@import "~@/assets/style/mixins.less";

.info_tab {
  /deep/ .ant-tabs-bar {
    border-bottom-color: #eaedf3;

    .ant-tabs-ink-bar {
      background-color: #e60000;
      height: 3px;
    }

    .ant-tabs-tab {
      .text("text", "dark", "NunitoSans-Regular");

      &.ant-tabs-tab-active {
        .text("text", "dark", "NunitoSans-Bold");
      }
    }
  }

  /deep/ .actions_table {
    .index {
      .text("tiny", "light", "NunitoSans-Regular");
    }

    .tx_id {
      /*cursor: pointer;*/
      .text-ellipsis();
      .text("text", "empher", "NunitoSans-Regular");
    }

    .date {
      .text("text", "dark", "NunitoSans-Regular");
    }

    .name {
      display: flex;
      align-items: center;

      .action_account {
        .text("text", "light", "NunitoSans-Regular");
      }

      .dash {
        .text("text", "dark", "NunitoSans-Regular");
        margin: 0 5px;
      }

      .action_name {
        .text("text", "dark", "NunitoSans-Regular");
      }
    }

    .action {
      flex-grow: 1;
      min-width: 0;

      .action_data {
        .transfer {
          flex-shrink: 0;
          .text("tiny", "empher", "NunitoSans-Regular");
        }

        .bottom {
          margin-top: 3px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .memo {
            flex-grow: 1;
            min-width: 0;
            .text-ellipsis();
            .text("tiny", "light", "NunitoSans-Regular");
          }

          .quantity {
            margin-left: 8px;
            flex-shrink: 0;
            .text("tiny", "dark", "NunitoSans-Regular");
          }
        }
      }

      .memo_data {
        .text-ellipsis();
        .text("tiny", "light", "NunitoSans-Regular");
      }
    }
  }

  /deep/.token_transfer_table {
    .time {
      display: flex;
      align-items: center;
      flex-direction: column;
      .text("tiny", "dark", "NunitoSans-Regular");
    }
    .direction {
      .text("text", "dark", "NunitoSans-Bold");
    }
    .to,
    .from {
      .text("text", "empher", "NunitoSans-Regular");
    }
    .memo {
      width: 300px;
      background: #e3e6e9;
      border-radius: 2px;
      text-align: center;
      .text("text", "dark", "NunitoSans-Bold");
      padding: 5px;
      box-sizing: border-box;
      word-break: break-all;
      overflow-wrap: break-word;
    }

    .quantity {
      .text("text", "dark", "NunitoSans-Regular");
    }

    .tx_id {
      /*cursor: pointer;*/
      .text-ellipsis();
      .text("text", "empher", "NunitoSans-Regular");
    }
  }

  /deep/ .permission_table {
    .perm_name,
    .threshold,
    .weight {
      .text("text", "dark", "NunitoSans-Regular");
    }

    .address {
      .key {
        .text("text", "empher", "NunitoSans-Regular");
        /*cursor: pointer;*/
      }

      .account {
        display: flex;
        align-items: center;

        .actor {
          .text("text", "empher", "NunitoSans-Regular");
        }

        .weight {
          margin-left: 5px;
          .text("text", "dark", "NunitoSans-Regular");
        }
      }
    }
  }

  .controlled_accounts {
    padding: 30px 0;
    .controlled_account {
      .text("text", "empher", "NunitoSans-Regular");
      padding: 25px 80px;
      &:not(:last-child) {
        box-shadow: 0 1px 0 0 #eaedf3;
      }
    }
  }
}
</style>
