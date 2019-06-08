/** * Created by Xinhe on 2019-05-25. */
<template>
  <div class="account">
    <Panel class="panel">
      <span class="title" slot="title" v-if="!notFound">
        <span class="text">Account: </span>
        <span class="name">{{ accountName }}</span>
      </span>
      <span v-else class="not_found" slot="title">
        OOPS!
      </span>
      <div class="content" v-if="!notFound">
        <template v-if="account">
          <div class="info">
            <account-info-row class="row" label="Total Balance:">
              <div class="balance">
                <span class="xst"
                  >{{ balance | numberFormat }} {{ totalBalance }} /</span
                >
                <span class="dollar"
                  >{{ (balance * xstRate) | numberFormat }} USD</span
                >
              </div>
            </account-info-row>

            <account-info-row class="row" label="Unstaked:">
              <div class="unstacked">{{ unstaked }} {{ totalBalance }}</div>
            </account-info-row>

            <account-info-row class="row" label="Stacked:">
              <div class="stacked">{{ stacked }} {{ coin }}</div>
            </account-info-row>

            <account-info-row class="row" label="CPU:" style="margin-top: 40px">
              <progress-bar
                :max="account.cpu_limit.max / 1000000"
                :current="account.cpu_limit.used / 1000000"
                color="#6758F3"
                rest-color="#EFEEFD"
                unit="sec"
              />
            </account-info-row>

            <account-info-row class="row" label="NET:">
              <progress-bar
                :max="account.net_limit.max / 1024"
                :current="account.net_limit.used / 1024"
                color="#34AA44"
                rest-color="#EAF6EC"
                unit="kb"
              />
            </account-info-row>

            <account-info-row class="row" label="RAM:">
              <progress-bar
                :max="account.ram_quota / 1024"
                :current="account.ram_usage / 1024"
                color="#F6AB2F"
                rest-color="#FFF3E9 "
                unit="kb"
              />
            </account-info-row>

            <account-info-row
              class="row"
              label="Tokens:"
              style="margin-top: 40px"
            >
              <TokenTag contract="xeniro.io" currency="XST" :amount="balance" />
            </account-info-row>

            <account-info-row
              class="row"
              label="Total Resources:"
              style="margin-top: 40px"
              v-if="account.total_resources"
            >
              <div class="total_resources">
                <span class="label">CPU weight:</span>
                <span class="value">{{
                  account.total_resources.cpu_weight
                }}</span>

                <span class="label">NET weight:</span>
                <span class="value">{{
                  account.total_resources.net_weight
                }}</span>

                <span class="label">Owner</span>
                <span class="value">{{ account.total_resources.owner }}</span>
              </div>
            </account-info-row>

            <account-info-row
              class="row"
              label="Delegated Bandwidth:"
              v-if="account.delegated_brandwidth"
            >
              <div class="delegated_brandwidth">
                <span class="label">CPU weight:</span>
                <span class="value">{{
                  account.delegated_bandwidth.cpu_weight
                }}</span>

                <span class="label">from:</span>
                <span class="value">{{
                  account.delegated_bandwidth.from
                }}</span>

                <span class="label">NET weight:</span>
                <span class="value">{{
                  account.delegated_bandwidth.net_weight
                }}</span>

                <span class="label">to:</span>
                <span class="value">{{ account.delegated_bandwidth.to }}</span>
              </div>
            </account-info-row>

            <account-info-row
              class="row"
              label="Voter Info:"
              v-if="account.voter_info"
            >
              <div class="voter_info">
                <span class="label">Last vote weight:</span>
                <span class="value">{{
                  account.voter_info.last_vote_weight
                }}</span>

                <span class="label">Owner:</span>
                <span class="value">{{ account.voter_info.owner }}</span>
              </div>
            </account-info-row>

            <account-info-row class="row" label="Created time:">
              <div class="created_time">
                {{ createdTime }}
              </div>
            </account-info-row>
          </div>

          <div style="margin-top: 40px" class="raw_data">
            <a-collapse :bordered="false">
              <a-collapse-panel key="contract">
                <span slot="header" class="header">
                  Contract Raw Data:
                </span>
                <vue-json-pretty :showLine="false" :data="code" />
              </a-collapse-panel>

              <a-collapse-panel
                v-for="(table, index) in codeTables"
                :key="index"
              >
                <span slot="header" class="header">
                  Table - {{ table.name }}
                </span>
                <vue-json-pretty :showLine="false" :data="table.data" />
              </a-collapse-panel>

              <a-collapse-panel key="blockchain">
                <span slot="header" class="header">
                  Blockchain Raw Data:
                </span>
                <vue-json-pretty :showLine="false" :data="account" />
              </a-collapse-panel>
            </a-collapse>
          </div>

          <InfoTabs
            class="tabs"
            :account="account"
            :actions="actions"
            :controlledAccount="controlledAccount"
            style="margin-top: 20px"
          >
          </InfoTabs>
        </template>
      </div>
      <div v-else class="not_found_content">
        NOTHING FOUND :(
      </div>
    </Panel>
  </div>
</template>

<script>
import Panel from "@/components/Panel";
import AccountInfoRow from "@/views/Account/AccountInfoRow";
import * as types from "@/store/mutation-types";
import ProgressBar from "@/views/Account/ProgressBar";
import Moment from "moment";
import InfoTabs from "@/views/Account/InfoTabs";
import VueJsonPretty from "vue-json-pretty";
import TokenTag from "@/views/Account/TokenTag";
import { loading } from "@/utils";
import EventBus from "@/eventBus";

export default {
  components: {
    TokenTag,
    InfoTabs,
    ProgressBar,
    AccountInfoRow,
    Panel,
    VueJsonPretty
  },
  props: {
    query: String
  },
  data() {
    return {
      loading: false,

      account: null,

      unstaked: null,
      balance: null,

      tokenContract: "eosio.token",
      totalBalance: "XST",
      coin: "XST",
      // customBalance: false,
      xstRate: 1.01, // todo

      code: null,
      codeTables: null,

      actions: null,

      controlledAccount: null,

      notFound: false
    };
  },
  computed: {
    accountName() {
      return this.$store.state.query;
    },

    stacked() {
      return (this.account?.voter_info?.stacked || 0) / 10000;
    },

    createdTime() {
      return Moment(this.account?.created).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  methods: {
    async searchAccount() {
      this.notFound = false;
      try {
        this.account = await this.$apis.getAccount({
          account_name: this.accountName
        });
      } catch (e) {
        this.notFound = true;
        throw new Error("not found account");
      }
      await Promise.all([
        this.getTokens(),
        this.getControlledAccounts(),
        this.getBalance(),
        this.getActions(),
        this.getAccountCreator(),
        this.getCode()
      ]);
    },

    async getBalance() {
      const res = await this.$apis.getCurrencyBalance({
        code: this.tokenContract,
        account: this.accountName,
        symbol: this.totalBalance
      });
      this.unstaked = !res[0] ? 0 : Number(res[0].split(" ")[0]);
      this.balance = this.unstaked + this.stacked;
      // this.eosRate = this.MainService.getEosPrice();
    },

    async getCode() {
      this.code = await this.$apis.getAbi({
        account_name: this.accountName
      });
      if (!this.code.abi || !this.code.abi.tables) {
        return;
      }
      this.codeTables = await Promise.all(
        this.code.abi.tables.map(({ name }) => async () => {
          const data = await this.$apis.getTableRows({
            json: true,
            code: this.accountName,
            scope: this.accountName,
            table: name,
            limit: 20
          });
          return {
            name,
            data
          };
        })
      );
    },

    getAccountCreator() {
      //todo ??? api
    },

    createArrayAccounts(data) {
      let result = {
        controlled_accounts: []
      };
      data.forEach(elem => {
        if (elem.controlled_permission === "active") {
          result.controlled_accounts.push(elem.controlled_account);
        }
      });
      return result;
    },

    async getControlledAccounts() {
      const res = await this.$apis.getControlledAccounts({
        controlling_account: this.accountName
      });
      this.controlledAccount =
        res && !res.controlled_accounts ? this.createArrayAccounts(res) : res;
    },

    createActionsArr(actions) {
      actions.forEach(elem => {
        elem.action_trace = {};
        elem.action_trace.receipt = elem.receipt;
        elem.action_trace.act = elem.act;
        elem.action_trace.trx_id = elem.trx_id;
      });
      return actions;
    },
    sortArrayFunctions(data) {
      if (!data) {
        return [];
      }
      let uniqieString = [];
      let result = [];
      data.forEach(elem => {
        let unique = elem.action_trace.act.hex_data + elem.action_trace.trx_id;
        if (uniqieString.indexOf(unique) === -1) {
          result.push(elem);
          uniqieString.push(unique);
        }
      });
      uniqieString = [];
      return result;
    },

    async getActions() {
      //todo next page
      const res = await this.$apis.getActions({
        account_name: this.accountName,
        pos: -1,
        offset: -100
      });

      // this.actionsNotSorted = res.actions;
      if (res.actions[0] && !res.actions[0].action_trace) {
        res.actions = this.createActionsArr(res.actions);
        this.actionsTotal = res.actionsTotal;
      } else {
        res.actions.reverse();
      }
      res.actions = this.sortArrayFunctions(res.actions);
      this.actions = res.actions;
      // this.actions.push(...res.actions)
      // let ELEMENT_DATA: Element[] = this.actionsArray;
      // this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
      // this.dataSource.filterPredicate = function(data, filter: string): boolean {
      //   return data.action_trace.act.name.toLowerCase().includes(filter) ||
      //           data.action_trace.act.account.toLowerCase().includes(filter);
    },

    getTokens() {
      //todo
      console.log("get token", this.accountName);
    },

    @loading("loading")
    async init() {
      await Promise.all([
        this.searchAccount()
        // this.getTokens(),
        // this.getControlledAccounts()
      ]);
    }
  },
  beforeDestroy() {
    EventBus.$emit("loading", false);
  },
  watch: {
    query: {
      immediate: true,
      handler(query) {
        this.$store.commit(types.SET_QUERY, query);
        this.init();
      }
    },
    loading: {
      immediate: true,
      handler(loading) {
        EventBus.$emit("loading", loading);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/mixins.less";

.account {
  .panel {
    margin: 30px 0;
    .not_found {
      .text("h2", "antibg", "OPTIEdgarBold-Extended");
    }
    .title {
      display: inline-flex;
      align-items: baseline;

      .text {
        .text("h2", "antibg", "OPTIEdgarBold-Extended");
      }

      .name {
        margin-left: 10px;
        .text("h2", "antibg", "NunitoSans-Bold");
      }
    }

    .content {
      padding: 30px;

      .info {
        .row {
          + .row {
            margin-top: 20px;
          }
        }

        .balance {
          display: flex;
          align-items: center;

          .xst {
            .text("text", "dark", "NunitoSans-Bold");
          }

          .dollar {
            margin-left: 5px;
            .text("text", "light", "NunitoSans-Regular");
          }
        }

        .unstacked,
        .stacked {
          .text("text", "light", "NunitoSans-Regular");
        }

        .total_resources,
        .delegated_brandwidth,
        .voter_info {
          display: flex;
          align-items: center;

          .label {
            .text("text", "dark", "NunitoSans-Regular");
            margin-right: 4px;
          }

          .value {
            margin-right: 20px;
            .text("text", "light", "NunitoSans-Regular");
          }
        }

        .created_time {
          .text("text", "dark", "NunitoSans-Regular");
        }
      }

      .raw_data {
        /deep/ .ant-collapse-header {
          padding-left: 24px !important;

          .arrow {
            left: 0 !important;
          }
        }

        .header {
          .text("text", "dark", "NunitoSans-Bold");
        }
      }
    }
    .not_found_content {
      text-align: center;
      height: 600px - 4px;
      box-sizing: border-box;
      padding-top: 140px;
      .text("h2", "dark", "NunitoSans-Bold");
    }
  }
}
</style>
