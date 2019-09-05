_x.config = {};

_x.config.langs = {
  sc: 'SC',
  tc: 'TC',
  en: 'EN',
};

_x.config.nets = {
  test: 'Test NET',
  main: 'Main NET',
  loki: 'Loki NET',
};

_x.config.langsMap = {};
_x.config.langsMap.en = {
  // search
  0x1000: 'Search Accounts, Transactions, Blocks',
  0x1001: 'Enter name, tx hash or block height',
  0x1002: 'Enter account name, key, tx hash or block number',

  // live status
  0x2000: 'Current Block',
  0x2001: 'Total Supply of XST',
  0x2002: 'Last Irreversible Block',
  0x2003: 'RAM In Chain',
  0x2004: 'Current Producer',
  0x2005: 'Voted Total',
  0x2006: 'Next Producer',
  0x2007: 'Staked Total',
  0x2008: 'APS (Live / All Time High)',
  0x2009: 'APS (Live / All Time High)',
  0x200A: 'CPU Limit (Block / Chain)',
  0x200B: 'NET Limit (Block / Chain)',

  // charts status
  0x3000: 'TPS / APS',
  0x3001: 'Producer Map',
  0x3002: 'Transform Amount Per Day',
  0x3003: 'Transactions Per Day',
  0x3004: 'Number of Accounts',
  0x3005: 'Number of Contracts',

  // infomation
  0x4000: 'Block Producers',
  0x4001: 'Latest Transactions',
  0x4100: 'Rank',
  0x4101: 'Account',
  0x4102: 'Location',
  0x4103: 'Status',
  0x4104: 'votes',
  0x4105: 'Producing',
  0x4106: 'Active',
  0x4107: 'Alternate',
  0x4200: 'Block Height',
  0x4201: 'Transaction Hash',
  0x4202: 'Account & contract',
  0x4203: 'Timestamp',
  0x4204: 'Info',

  // block details
  0x5000: 'Block Number',
  0x5001: 'Producer',
  0x5002: 'Timestamp',
  0x5003: 'Block Hash',
  0x5004: 'Total CPU Usage',
  0x5005: 'Total NET Usage',

  // transactions
  0x6000: 'Transaction Hash',
  0x6001: 'Actions',
  0x6002: 'CPU Usage',
  0x6003: 'NET Usage',
  0x6004: 'Expiration',

  // transaction details
  0x7000: 'Transaction Hash',
  0x7001: 'Status',
  0x7002: 'Block Number',
  0x7003: 'Block Time',
  0x7004: 'CPU Usage',
  0x7005: 'NET Usage',
  0x7006: 'Expiration Time',

  // actions
  0x8000: 'Contract',
  0x8001: 'Data',

  // account detail
  0x9000: 'Account Name',
  0x9001: 'Created at',
  0x9002: 'Total Balance',
  0x9003: 'RAM Usage',
  0x9004: 'CPU Usage',
  0x9005: 'NET Usage',

  // keys
  0xA000: 'VIEW',
  0xA001: 'PERMISSIONS',

  // titles
  0xF000: 'Live Status',
  0xF001: 'Charts',
  0xF002: 'Information',
  0xF003: 'Block Detail',
  0xF004: 'Transactions',
  0xF005: 'Transaction Details',
  0xF006: 'Actions',
  0xF007: 'Account Details',
  0xF008: 'Permissions & Keys',
};

_x.config.langsMap.tc = {
  0x1000: '查詢使用者，交易和區塊',
  0x1001: '輸入使用者名,交易Hash或區塊高度',
  0x1002: '輸入使用者名,交易Hash或區塊高度',

  0x2000: '當前區塊高度',
  0x2001: 'XST的總發行量',
  0x2002: '最新確認區塊',
  0x2003: '鏈上RAM',
  0x2004: '當前BP',
  0x2005: '投票百分比',
  0x2006: '下一個BP',
  0x2007: '抵押百分比',
  0x2008: '每秒交易 (當前 / 全期最高)',
  0x2009: '每秒事件 (當前 / 全期最高)',
  0x200A: 'CPU用量 (當前 / 全鏈)',
  0x200B: 'NET用量 (當前 / 全鏈)',

  0x3000: '每秒交易 / 每秒事件',
  0x3001: '節點圖',
  0x3002: '每日交易額',
  0x3003: '每日交易量',
  0x3004: '帳戶總數',
  0x3005: '合約總數',

  0x4000: '超級節點',
  0x4001: '交易動態',
  0x4100: '排名',
  0x4101: '帳戶名',
  0x4102: '地區',
  0x4103: '狀態',
  0x4104: '投票支援率',
  0x4105: '出塊中',
  0x4106: '運行',
  0x4107: '候補',
  0x4200: '區塊',
  0x4201: '交易Hash',
  0x4202: '使用者 & 合約',
  0x4203: '時間',
  0x4204: '資訊',

  0x5000: '區塊高度',
  0x5001: '出塊節點',
  0x5002: '時間',
  0x5003: '區塊Hash',
  0x5004: '總CPU用量',
  0x5005: '總NET用量',

  0x6000: '交易Hash',
  0x6001: '事件數',
  0x6002: 'CPU用量',
  0x6003: 'NET用量',
  0x6004: '過期時間',

  0x7000: '交易Hash',
  0x7001: '狀態',
  0x7002: '區塊高度',
  0x7003: '出塊時間',
  0x7004: 'CPU用量',
  0x7005: 'NET用量',
  0x7006: '過期時間',

  0x8000: '合約',
  0x8001: '資訊',

  0x9000: '賬戶',
  0x9001: '創建於',
  0x9002: '余額',
  0x9003: 'RAM用量',
  0x9004: 'CPU用量',
  0x9005: 'NET用量',

  0xA000: '查看',
  0xA001: '權限',

  0xF000: '運行狀態',
  0xF001: '圖表',
  0xF002: '資訊',
  0xF003: '區塊詳情',
  0xF004: '交易清單',
  0xF005: '交易詳情',
  0xF006: '事件清單',
  0xF007: '賬戶詳情',
  0xF008: '權限 & 公鑰',
};

_x.config.langsMap.sc = {
  0x1000: '查询用户，交易和区块',
  0x1001: '输入用户名,交易Hash或区块高度',
  0x1002: '输入用户名,交易Hash或区块高度',

  0x2000: '当前区块高度',
  0x2001: 'XST的总发行量',
  0x2002: '最新确认区块',
  0x2003: '链上RAM',
  0x2004: '当前BP',
  0x2005: '投票百分比',
  0x2006: '下一个BP',
  0x2007: '抵押百分比',
  0x2008: '每秒交易 (当前 / 全期最高)',
  0x2009: '每秒事件 (当前 / 全期最高)',
  0x200A: 'CPU用量 (当前 / 全链)',
  0x200B: 'NET用量 (当前 / 全链)',

  0x3000: '每秒交易 / 每秒事件',
  0x3001: '节点图',
  0x3002: '每日交易额',
  0x3003: '每日交易量',
  0x3004: '账户总数',
  0x3005: '合约总数',

  0x4000: '超级节点',
  0x4001: '交易动态',
  0x4100: '排名',
  0x4101: '账户名',
  0x4102: '地区',
  0x4103: '状态',
  0x4104: '投票支持率',
  0x4105: '出块中',
  0x4106: '运行',
  0x4107: '候补',
  0x4200: '区块',
  0x4201: '交易Hash',
  0x4202: '用户 & 合约',
  0x4203: '时间',
  0x4204: '信息',

  0x5000: '区块高度',
  0x5001: '出块节点',
  0x5002: '时间',
  0x5003: '区块Hash',
  0x5004: '总CPU用量',
  0x5005: '总NET用量',

  0x6000: '交易Hash',
  0x6001: '事件数',
  0x6002: 'CPU用量',
  0x6003: 'NET用量',
  0x6004: '过期时间',

  0x7000: '交易Hash',
  0x7001: '状态',
  0x7002: '区块高度',
  0x7003: '出块时间',
  0x7004: 'CPU用量',
  0x7005: 'NET用量',
  0x7006: '过期时间',

  0x8000: '合约',
  0x8001: '信息',

  0x9000: '账户',
  0x9001: '创建于',
  0x9002: '余额',
  0x9003: 'RAM用量',
  0x9004: 'CPU用量',
  0x9005: 'NET用量',

  0xA000: '查看',
  0xA001: '权限',

  0xF000: '运行状态',
  0xF001: '图表',
  0xF002: '信息',
  0xF003: '区块详情',
  0xF004: '交易列表',
  0xF005: '交易详情',
  0xF006: '事件列表',
  0xF007: '账户详情',
  0xF008: '权限 & 公钥',
};
