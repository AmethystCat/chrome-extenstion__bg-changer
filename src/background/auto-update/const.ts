export const localHttpProxy = {
  value: {
    mode: "fixed_servers",
    rules: {
      bypassList: ["<local>"],
      proxyForHttps: { scheme: "http", host: "127.0.0.1", port: 7890 },
    },
  },
  scope: "regular",
};

export const system_default = { value: { mode: "system" } };

export const sock5Proxy = {
  value: {
    mode: "fixed_servers",
    rules: {
      bypassList: ["<local>"],
      proxyForHttps: { scheme: "socks5", host: "39.96.177.47", port: 6382 },
    },
  },
  scope: "regular",
};

export const not_controllable = "not_controllable";
export const controlled_by_other_extensions = "controlled_by_other_extensions";
export const controllable_by_this_extension = "controllable_by_this_extension";
export const controlled_by_this_extension = "controlled_by_this_extension";

export const install_reason_install = "install";
export const install_reason_update = "update";
export const storage_sock5 = "ense9slas";
export const storage_user = "ense9140x";

export const getEmptyConfig = () => {
  return {
    value: {
      mode: "fixed_servers",
      rules: {
        bypassList: ["<local>"],
        proxyForHttps: { scheme: "socks5", host: "", port: 80 },
      },
    },
    scope: "regular",
  };
};
