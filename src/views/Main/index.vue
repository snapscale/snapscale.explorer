/** * Created by Xinhe on 2019-05-25. */
<template>
  <div class="main_page">
    <div class="row">
      <BasicPanel
        style="margin-right: 30px"
        class="basic_panel"
        :info="info"
        :producer="producer"
        :nextProducer="nextProducer"
        :currentTPS="currentTPS"
        :currentAPS="currentAPS"
      />
      <div>
        <BPMap :data="latestProducers" :producer="producer" />
        <Transaction
          style="margin-top: 20px"
          :tpsBlocks="tpsBlocks"
          @currentAPS="currentAPS = $event"
          @currentTPS="currentTPS = $event"
        />
      </div>
    </div>

    <div class="row">
      <Blocks style="margin-right: 30px" :data="latestBlocks" />
      <LatestActions :data="latestActions" />
    </div>

    <div class="row" style="margin-bottom: 30px">
      <ProducerRate :data="latestProducers" :producer="producer" />
    </div>
  </div>
</template>

<script>
import Blocks from "@/views/Main/Blocks";
import LatestActions from "@/views/Main/LatestActions";
import { BLOCK_UPDATE_TIME, interval, TPS_UPDATE_TIME } from "@/utils";
import IntervalMixin from "@/views/IntervalMixin";
import ProducerRate from "@/views/Main/ProducerRate";
import Transaction from "@/views/Main/Transaction";
import BPMap from "@/views/Main/BPMap";
import BPInfo from "./bp_info";
import BasicPanel from "@/views/Main/BasicPanel";

export default {
  components: {
    BasicPanel,
    BPMap,
    Transaction,
    ProducerRate,
    LatestActions,
    Blocks
  },
  mixins: [IntervalMixin],
  data() {
    const offset = 5;
    return {
      latestBlocks: null,
      info: null,
      blocks: Array.from({ length: offset }, (v, k) => k++),

      offsetPageElems: 6,

      BPInfoMap: BPInfo.bp.reduce(
        (prev, { name, country, longitude, latitude, url }) => {
          const lowerCaseCountry = country.toLowerCase();
          return {
            ...prev,
            [name]: {
              url,
              longitude,
              latitude,
              country: lowerCaseCountry,
              image: require(`@/assets/image/country/${lowerCaseCountry}.png`)
            }
          };
        },
        {}
      ),

      latestProducers: null,

      tpsBlocks: null,
      currentAPS: null,
      currentTPS: null,

      ungerKey: "EOS1111111111111111111111111111111114T1Anm",

      latestActions: null,

      trxObj: {}
    };
  },
  computed: {
    // latestActions() {
    //   const data = this.latestBlocks;
    //   if (!data) return null;
    //   let transactions = [];
    //   const trxObj = {};
    //   data.forEach(elem => {
    //     if (elem.transactions && elem.transactions.length > 0) {
    //       elem.transactions.forEach(tr => {
    //         if (!trxObj[elem.block_num]) {
    //           trxObj[elem.block_num] = [];
    //         }
    //         if (tr.trx && tr.trx.transaction && tr.trx.transaction.actions) {
    //           tr.trx.transaction.actions.forEach(act => {
    //             act.block_num = tr.trx.id;
    //           });
    //           Array.prototype.push.apply(
    //             trxObj[elem.block_num],
    //             tr.trx.transaction.actions
    //           );
    //         }
    //       });
    //     }
    //   });
    //
    //   Object.keys(trxObj).forEach(key => {
    //     Array.prototype.push.apply(transactions, trxObj[key]);
    //   });
    //   transactions.reverse();
    //
    //   if (transactions.length >= this.offsetPageElems) {
    //     let blocks = Object.keys(trxObj);
    //     blocks.forEach((key, index) => {
    //       if (index < blocks.length - this.offsetPageElems) {
    //         delete trxObj[key];
    //       }
    //     });
    //     return transactions.slice(0, this.offsetPageElems);
    //   }
    //
    //   return transactions;
    // },

    producer() {
      if (!this.tpsBlocks) return null;
      return this.tpsBlocks[1].producer;
    },

    nextProducer() {
      if (!this.latestProducers || !this.producer) return null;
      const index = this.latestProducers.findIndex(
        ({ owner }) => owner === this.producer
      );
      return this.latestProducers[(index + 1) % this.latestProducers.length]
        .owner;
    }
  },
  methods: {
    async getLastBlocks(blocks) {
      const info = await this.$apis.getInfo({});
      const { head_block_num } = info;
      this.info = info;
      if (!head_block_num) {
        throw new Error("Cant get info from blockchain!");
      }

      const res = await Promise.all(
        blocks.map(d =>
          this.$apis.getBlock({ block_num_or_id: head_block_num - d })
        )
      );
      res.sort((a, b) => b.block_num - a.block_num);

      return res;
    },

    @interval("latestBlocks", BLOCK_UPDATE_TIME)
    async getLatestBlocks() {
      return this.sortArray(await this.getLastBlocks(this.blocks));
    },

    @interval("tpsBlocks", TPS_UPDATE_TIME)
    async getTPS() {
      return await this.getLastBlocks([1, 2]);
    },

    countRewards(total_votes, index, totalProducerVoteWeight, votesToRemove) {
      let position = index;
      let reward = 0;
      let percentageVotesRewarded =
        (total_votes / (totalProducerVoteWeight - votesToRemove)) * 100;

      if (position < 22) {
        reward += 318;
      }
      reward += percentageVotesRewarded * 200;
      if (reward < 100) {
        reward = 0;
      }
      return Math.floor(reward).toLocaleString();
    },

    countRate(data, totalProducerVoteWeight) {
      if (!data) {
        return;
      }
      const votesToRemove = data.reduce((acc, cur) => {
        const percentageVotes = (cur.all_votes / totalProducerVoteWeight) * 100;
        if (percentageVotes * 200 < 100) {
          acc += parseFloat(cur.all_votes);
        }
        return acc;
      }, 0);
      data.forEach((elem, index) => {
        elem.index = index + 1;
        elem.rate = (
          (elem.all_votes / totalProducerVoteWeight) *
          100
        ).toLocaleString();
        elem.rewards = this.countRewards(
          elem.all_votes,
          elem.index,
          totalProducerVoteWeight,
          votesToRemove
        );
      });

      return data;
    },

    calculateEosFromVotes(votes) {
      let date = +new Date() / 1000 - 946684800;
      let weight = parseInt(`${date / (86400 * 7)}`, 10) / 52; // 86400 = seconds per day 24*3600
      return votes / 2 ** weight / 10000;
    },

    sortArray(data) {
      if (!data) {
        return;
      }
      let result = [];
      data
        .sort((a, b) => {
          return b.total_votes - a.total_votes;
        })
        .forEach(elem => {
          if (elem.producer_key === this.ungerKey) {
            return;
          }
          let eos_votes = Math.floor(
            this.calculateEosFromVotes(elem.total_votes)
          );
          elem.all_votes = elem.total_votes;
          elem.total_votes = Number(eos_votes).toLocaleString();

          result.push(elem);
        });
      return result;
    },

    async getProducers() {
      const reqs = [
        this.$apis.getTableRows({
          json: true,
          code: "eosio",
          scope: "eosio",
          table: "producers",
          limit: 1000
        }),
        this.$apis.getTableRows({
          json: true,
          code: "eosio",
          scope: "eosio",
          table: "global",
          limit: 1
        })
      ];

      const results = await Promise.all(reqs);
      const totalProducerVoteWeight =
        results[1].rows[0].total_producer_vote_weight;
      let producers = results[0].rows;
      producers = this.sortArray(producers);
      producers = this.countRate(producers, totalProducerVoteWeight);
      this.latestProducers = producers.map(item => {
        const info = this.BPInfoMap[item.owner];
        return {
          ...item,
          url: info?.url,
          latitude: info?.latitude,
          longitude: info?.longitude,
          location: info?.country,
          image: info?.image
        };
      });
    }
  },
  created() {
    this.getLatestBlocks();
    this.getProducers();
    this.getTPS();
  },
  watch: {
    latestBlocks: {
      immediate: true,
      handler(latestBlocks) {
        const data = latestBlocks;
        if (!data) return;
        let transactions = [];
        data.forEach(elem => {
          if (elem.transactions && elem.transactions.length > 0) {
            elem.transactions.forEach(tr => {
              if (!this.trxObj[elem.block_num]) {
                this.trxObj[elem.block_num] = [];
              }
              if (tr.trx && tr.trx.transaction && tr.trx.transaction.actions) {
                tr.trx.transaction.actions.forEach(act => {
                  act.block_num = tr.trx.id;
                });
                Array.prototype.push.apply(
                  this.trxObj[elem.block_num],
                  tr.trx.transaction.actions
                );
              }
            });
          }
        });

        Object.keys(this.trxObj).forEach(key => {
          Array.prototype.push.apply(transactions, this.trxObj[key]);
        });
        transactions.reverse();

        if (transactions.length >= this.offsetPageElems) {
          let blocks = Object.keys(this.trxObj);
          blocks.forEach((key, index) => {
            if (index < blocks.length - this.offsetPageElems) {
              delete this.trxObj[key];
            }
          });
          this.latestActions = transactions.slice(0, this.offsetPageElems);
          return;
        }
        this.latestActions = transactions;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.basic_panel {
  width: 580px;
  height: 630px;
}

.main_page {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.row {
  display: flex;
  align-items: center;
  margin-top: 30px;
  > * {
    flex-shrink: 0;
  }
  /*+ .row {*/
  /*    margin-top: 30px;*/
  /*}*/
}
</style>
