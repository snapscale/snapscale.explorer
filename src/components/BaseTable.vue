<script>
export default {
  name: "BaseTable",
  props: {
    columns: Array,
    data: Array
  },
  render(h) {
    const { columns, data } = this;
    return (
      <div class="table">
        <div class="header row">
          {columns?.map(({ key, width, label }) => {
            return (
              <div key={key} style={{ width: `${width}px` }} class="col">
                {label}
              </div>
            );
          })}
        </div>
        <div class="content">
          {data?.map((ele, index) => {
            return (
              <div class="row" key={index}>
                {columns?.map(({ key, width, render }) => {
                  return (
                    <div key={key} style={{ width: `${width}px` }} class="col">
                      <div class={key}>
                        {render ? render(h, ele[key], ele, index) : ele[key]}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
</script>

<style scoped lang="less">
@import "~@/assets/style/mixins.less";

.table {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 100%;

  .header {
    margin-top: 20px;
    flex-shrink: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    .text("text", "title", "NunitoSans-Regular");
  }

  .row {
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0);
    box-sizing: border-box;
    flex-shrink: 0;
    .col {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .content {
    flex-grow: 1;
    min-height: 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .row {
      height: 70px;
      &:not(:last-child) {
        box-shadow: 0 1px 0 0 #eaedf3;
      }
    }
  }
}
</style>
