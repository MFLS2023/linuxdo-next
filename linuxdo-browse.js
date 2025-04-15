// ==UserScript==
// @name         linuxdo-browse
// @namespace    linuxdo-browse
// @version      0.0.1-alpha.5
// @author       delph1s,freetr
// @description  LinuxDo蓝点消除计划
// @license      GPLv2
// @iconURL      https://cdn.linux.do/uploads/default/original/3X/9/d/9dd49731091ce8656e94433a26a3ef36062b3994.png
// @homepageURL  https://github.com/delph1s/linuxdo-browse
// @match        *://linux.do/
// @match        *://linux.do/*
// @exclude      *://linux.do/*.json
// @require      https://registry.npmmirror.com/react/18.3.1/files/umd/react.production.min.js
// @require      https://registry.npmmirror.com/react-dom/18.3.1/files/umd/react-dom.production.min.js
// @require      https://registry.npmmirror.com/dayjs/1.11.13/files/dayjs.min.js
// @require      https://registry.npmmirror.com/dayjs/1.11.13/files/plugin/duration.js
// @require      https://registry.npmmirror.com/lodash/4.17.21/files/lodash.min.js
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const i=document.createElement("style");i.textContent=o,document.head.append(i)})(' :export{browseName:"linuxdo-browse";browseContainer:linuxdo-browse-container;browseButton:linuxdo-browse-toggle-button;chipName:linuxdo-browse-chip;dialogName:linuxdo-browse-dialog;dialogBodyName:linuxdo-browse-dialog-body;dialogBodySwitchDuration:150}#linuxdo-browse-container{position:fixed;bottom:3rem;right:1rem;width:32rem;border-radius:.5rem;display:block;z-index:1000;opacity:0;visibility:hidden;transition:all .3s ease-in-out}#linuxdo-browse-container.open{bottom:4rem;opacity:1;visibility:visible}#linuxdo-browse-toggle-button{z-index:1001;position:fixed;bottom:1rem;right:1rem}.linuxdo-browse-chip{font-size:.75rem;line-height:1rem;padding:.25rem .5rem;border-radius:.25rem}.linuxdo-browse-chip.linuxdo-browse-chip-primary{background-color:#f8b3ca;color:#cc084b}.linuxdo-browse-chip.linuxdo-browse-chip-secondary{background-color:#d7d9e1;color:#6c757d}.linuxdo-browse-chip.linuxdo-browse-chip-info{background-color:#aecef7;color:#095bc6}.linuxdo-browse-chip.linuxdo-browse-chip-success{background-color:#bce2be;color:#339537}.linuxdo-browse-chip.linuxdo-browse-chip-warning{background-color:#ffd59f;color:#c87000}.linuxdo-browse-chip.linuxdo-browse-chip-error{background-color:#fcd3d0;color:#f61200}.linuxdo-browse-chip.linuxdo-browse-chip-light{background-color:#fff;color:#c7d3de}.linuxdo-browse-chip.linuxdo-browse-chip-dark{background-color:#8097bf;color:#1e2e4a}.linuxdo-browse-dialog-body{transition:opacity .15s ease,transform .15s ease;transform:translate(30%);display:none;opacity:0}.linuxdo-browse-dialog-body.active{transform:translate(0);display:block;opacity:1}.linuxdo-browse-dialog-body.animating{transform:translate(-30%);display:block;opacity:0}#settings-container{border:solid 1px var(--primary-low)}#settings-container h4{background-color:var(--primary-very-low);padding:.5rem 1rem}#settings-container ul{list-style:none;margin:0}#settings-container ul li{align-items:center;display:flex;flex-wrap:nowrap;flex-direction:row-reverse;justify-content:space-between;border-bottom:1px solid var(--primary-low);padding:.25rem 1rem}#settings-container ul span{border-radius:3px;display:inline-flex;margin:0 6px;padding:2px 1px 4px}#settings-container ul span:first-child{margin-right:0}#settings-container ul span:last-child{margin-left:auto} ');

(function (require$$0, lodash, require$$0$1, dayjs, duration) {
  'use strict';

  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var f = require$$0, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m$1.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  {
    jsxRuntime.exports = reactJsxRuntime_production_min;
  }
  var jsxRuntimeExports = jsxRuntime.exports;
  const browseName = '"linuxdo-browse"';
  const browseContainer = "linuxdo-browse-container";
  const browseButton = "linuxdo-browse-toggle-button";
  const chipName = "linuxdo-browse-chip";
  const dialogName = "linuxdo-browse-dialog";
  const dialogBodyName = "linuxdo-browse-dialog-body";
  const dialogBodySwitchDuration = "150";
  const styles = {
    browseName,
    browseContainer,
    browseButton,
    chipName,
    dialogName,
    dialogBodyName,
    dialogBodySwitchDuration
  };
  const DEFAULT_APP_SETTINGS = {
    readAllPostsInTopic: false,
    // 是否阅读主题所有帖子，false 从最后的内容开始看
    singlePostsReading: 1e3,
    // 单次阅读帖子数，控制 timings 请求 body 行为
    maxRetryTimes: 10,
    // 最大重试次数
    windowPeriodTopics: [[26306, 200]],
    // 空窗期随机阅读的帖子列表，[[<topic_id>, <阅读楼层数>]]
    getCsrfTokenFromHtml: true,
    // 是否从 html 中获取 csrf token
    maxLogLineNum: 100,
    // 日志最大条数
    uiWidth: "36rem",
    // ui 宽度
    uiQueueHeight: "100px",
    // ui 任务队列高度
    uiLogHeight: "400px",
    // ui 日志高度
    uiTagFontSize: "0.75rem",
    // ui 标签字体大小
    uiQueueFontSize: "0.75rem",
    // ui 队列字体大小
    uiLogFontSize: "0.75rem"
    // ui 日志字体大小
  };
  const APP_SETTINGS_KEY = "linuxdo-browse-app-settings";
  const localStorageAvailable = () => {
    try {
      const key = "__some_random_key_you_are_not_going_to_use__";
      window.localStorage.setItem(key, key);
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  };
  const localStorageGetItem = (key, defaultValue = "") => {
    const storageAvailable = localStorageAvailable();
    let value;
    if (storageAvailable) {
      value = localStorage.getItem(key) || defaultValue;
    }
    return value;
  };
  const getStorage = (key) => {
    try {
      const result = localStorageGetItem(key);
      if (result) {
        return JSON.parse(result);
      }
    } catch (error) {
      console.error("Error while getting from storage:", error);
    }
    return null;
  };
  const setStorage = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error while setting storage:", error);
    }
  };
  const removeStorage = (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error while removing from storage:", error);
    }
  };
  const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = require$$0.useState(initialValue);
    const multiValue = initialValue && typeof initialValue === "object";
    const canReset = !lodash.isEqual(value, initialValue);
    require$$0.useEffect(() => {
      const restoredValue = getStorage(key);
      if (restoredValue) {
        if (multiValue) {
          setValue((prevValue) => ({ ...prevValue, ...restoredValue }));
        } else {
          setValue(restoredValue);
        }
      }
    }, [key, multiValue]);
    const setState = require$$0.useCallback(
      (updateValue) => {
        if (multiValue) {
          setValue((prevValue) => {
            setStorage(key, { ...prevValue, ...updateValue });
            return { ...prevValue, ...updateValue };
          });
        } else {
          setStorage(key, updateValue);
          setValue(updateValue);
        }
      },
      [key, multiValue]
    );
    const setField = require$$0.useCallback(
      (name, updateValue) => {
        if (multiValue) {
          setState({ [name]: updateValue });
        }
      },
      [multiValue, setState]
    );
    const resetState = require$$0.useCallback(() => {
      setValue(initialValue);
      removeStorage(key);
    }, [initialValue, key]);
    const memorizedValue = require$$0.useMemo(
      () => ({
        state: value,
        setState,
        setField,
        resetState,
        canReset
      }),
      [canReset, resetState, setField, setState, value]
    );
    return memorizedValue;
  };
  function settingsReducer(state, action) {
    switch (action.type) {
      case "RESET":
        return action.payload;
      case "UPDATE_ALL":
        return { ...state, ...action.payload };
      case "UPDATE_FIELD":
        return {
          ...state,
          [action.payload.field]: action.payload.value
        };
      default:
        return state;
    }
  }
  const SettingsContext = require$$0.createContext(null);
  SettingsContext.Consumer;
  function SettingsProvider({ settings, children, caches = "localStorage" }) {
    const [state, dispatch] = require$$0.useReducer(settingsReducer, settings);
    const localStorage2 = useLocalStorage(APP_SETTINGS_KEY, settings);
    const values = localStorage2;
    const onReset = require$$0.useCallback(() => {
      dispatch({ type: "RESET", payload: settings });
      values.resetState();
    }, [settings, values]);
    const onUpdate = require$$0.useCallback((updateValue) => {
      dispatch({ type: "UPDATE_ALL", payload: updateValue });
      values.setState(updateValue);
    }, [values]);
    const onUpdateField = require$$0.useCallback((field, value) => {
      dispatch({ type: "UPDATE_FIELD", payload: { field, value } });
      values.setField(field, value);
    }, [values]);
    const [openDialog, setOpenDialog] = require$$0.useState(false);
    const onToggleDialog = require$$0.useCallback(() => {
      setOpenDialog((prevState) => !prevState);
    }, []);
    const onCloseDialog = require$$0.useCallback(() => {
      setOpenDialog(false);
    }, []);
    const memorizedValue = require$$0.useMemo(
      () => ({
        ...state,
        canReset: values.canReset,
        onReset,
        onUpdate,
        onUpdateField,
        openDialog,
        onCloseDialog,
        onToggleDialog
      }),
      [
        state,
        values.canReset,
        onReset,
        onUpdate,
        onUpdateField,
        openDialog,
        onCloseDialog,
        onToggleDialog
      ]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsContext.Provider, { value: memorizedValue, children });
  }
  var client = {};
  var m = require$$0$1;
  {
    client.createRoot = m.createRoot;
    client.hydrateRoot = m.hydrateRoot;
  }
  function FuncIconButton({ changeMe = "changeMe", icon, ...restProps }) {
    const iconElement = typeof icon === "string" ? /* @__PURE__ */ jsxRuntimeExports.jsx("use", { href: `#${icon}` }) : icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        title: "Function Icon Button",
        "aria-label": "Function Icon Button",
        className: "btn btn-icon btn-flat no-text",
        ...restProps,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "fa d-icon svg-icon svg-string", xmlns: "http://www.w3.org/2000/svg", children: iconElement })
      }
    );
  }
  function IconButton({ changeMe = "changeMe", icon, ...restProps }) {
    const iconElement = typeof icon === "string" ? /* @__PURE__ */ jsxRuntimeExports.jsx("use", { href: `#${icon}` }) : icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": "Icon Button",
        className: "btn btn-default no-text btn-icon",
        ...restProps,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            className: "fa d-icon svg-icon svg-string",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: iconElement
          }
        )
      }
    );
  }
  function useSettingsContext() {
    const context = require$$0.useContext(SettingsContext);
    if (!context) throw new Error("useSettingsContext must be use inside SettingsProvider");
    return context;
  }
  function Chip({ label, color = "primary", ...restProps }) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${styles.chipName} ${styles.chipName}-${color}`, ...restProps, children: label });
  }
  dayjs.extend(duration);
  const formatDuration = (t) => {
    const diff = dayjs.duration(t);
    const years = diff.years();
    const days = diff.days();
    const hours = diff.hours();
    const minutes = diff.minutes();
    const seconds = diff.seconds();
    const ms = diff.milliseconds();
    const result = [];
    if (years > 0) result.push(`${years}年`);
    if (days > 0) result.push(`${days}天`);
    if (hours > 0) result.push(`${hours}小时`);
    if (minutes > 0) result.push(`${minutes}分钟`);
    if (seconds > 0) result.push(`${seconds}秒`);
    if (ms > 0) result.push(`${ms}毫秒`);
    return result.join("");
  };
  const formatDurationShort = (t) => {
    const diff = dayjs.duration(t);
    const years = diff.years();
    const days = diff.days();
    const hours = diff.hours();
    const minutes = diff.minutes();
    const seconds = diff.seconds();
    const ms = diff.milliseconds();
    if (years > 0) return `${years}年`;
    if (days > 0) return `${days}天`;
    if (hours > 0) return `${hours}小时`;
    if (minutes > 0) return `${minutes}分钟`;
    if (seconds > 0) return `${seconds}秒`;
    if (ms > 0) return `${ms}毫秒`;
    return "0秒";
  };
  const statusLevelMapping = {
    pending: "warning",
    processing: "info",
    completed: "success",
    retrying: "error",
    failed: "error"
  };
  function ConsoleSection({ taskQueue, logs, statsData, onClearLogs, ...restProps }) {
    const settings = useSettingsContext();
    const logContainerRef = require$$0.useRef(null);
    const logContainerEndRef = require$$0.useRef(null);
    const [shouldLogContainerAutoScroll, setShouldLogContainerAutoScroll] = require$$0.useState(true);
    const handleLogContainerScroll = () => {
      if (logContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = logContainerRef.current;
        const isScrolledToBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 1;
        setShouldLogContainerAutoScroll(isScrolledToBottom);
      }
    };
    const scrollLogContainerToBottom = require$$0.useCallback(() => {
      if (logContainerEndRef.current) {
        requestAnimationFrame(() => {
          logContainerEndRef.current.scrollIntoView({ behavior: "smooth" });
        });
      }
    }, []);
    require$$0.useLayoutEffect(() => {
      if (shouldLogContainerAutoScroll) {
        scrollLogContainerToBottom();
      }
    }, [logs, scrollLogContainerToBottom, shouldLogContainerAutoScroll]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "task-queue-container", style: { display: "inline-block", marginBottom: "1rem", width: "100%" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Queue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: { overflowX: "auto", height: settings.uiQueueHeight }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              style: {
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
                marginBottom: "0.5rem"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { label: `总任务数：${statsData.totalSuccess + statsData.totalFailed}`, color: "primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { label: `队列数：${taskQueue.length}`, color: "info" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { label: `成功数：${statsData.totalSuccess}`, color: "success" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { label: `失败数：${statsData.totalFailed}`, color: "error" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Chip,
                  {
                    label: `阅读时间：${formatDurationShort(statsData.totalReadingTime)}`,
                    color: "warning",
                    title: `格式时间：${formatDuration(statsData.totalReadingTime)}`
                  }
                )
              ]
            }
          ),
          taskQueue.map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              style: {
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
                marginBottom: "0.5rem"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: settings.uiQueueFontSize }, children: `[${task.actionType}] ${task.topicId}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { label: task.status, color: statusLevelMapping[task.status] })
              ]
            },
            task.taskId
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "log-container", style: { display: "inline-block", marginBottom: 0, width: "100%" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { flex: 1 }, children: "Logs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FuncIconButton,
            {
              title: "清除日志",
              "aria-label": "清除日志",
              onClick: onClearLogs,
              style: { flex: 0 },
              icon: "far-trash-can"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "ul",
          {
            ref: logContainerRef,
            onScroll: handleLogContainerScroll,
            style: {
                overflowX: "auto",
                overflowY: "auto",           // 新增：使日志区域在垂直方向也可滚动
                height: settings.uiLogHeight,
                wordBreak: "break-all"       // 新增：强制长文本换行
            },
            children: [
              logs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  style: {
                    justifyContent: "space-between",
                    alignItems: "center",
                    display: "flex",
                    marginBottom: "0.5rem"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: settings.uiLogFontSize }, children: `${log.time} - ${log.message}` }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { label: log.level, color: log.level })
                  ]
                },
                `${log.logId}`
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: logContainerEndRef })
            ]
          }
        )
      ] })
    ] });
  }
  function SettingsSection({ changeMe = "changeMe", ...restProps }) {
    const settings = useSettingsContext();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "settings-container", style: { display: "inline-block", marginBottom: 0, width: "100%" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { flex: 1 }, children: "Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FuncIconButton,
          {
            title: "重置",
            "aria-label": "重置",
            onClick: settings.onReset,
            style: { flex: 0, background: "var(--primary-very-low)", marginBottom: "0.5rem" },
            icon: "arrow-rotate-left",
            disabled: !settings.canReset
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: { overflowX: "auto", height: "500px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            onChange: (event) => {
              settings.onUpdateField("readAllPostsInTopic", event.target.checked);
            },
            checked: settings.readAllPostsInTopic
          }
        ) }),
        "阅读主题所有回复"
      ] }) })
    ] });
  }
  const getCsrfToken = async (getCsrfTokenFromHtml) => {
    if (getCsrfTokenFromHtml) {
      const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
      if (!csrfTokenElement) throw new Error("CSRF token element not found");
      return csrfTokenElement.getAttribute("content") || "";
    }
    const response = await fetch("https://linux.do/session/csrf", {
      headers: {
        "x-csrf-token": "undefined",
        "x-requested-with": "XMLHttpRequest"
      },
      method: "GET",
      mode: "cors",
      credentials: "include"
    }).then((res) => res.json());
    if (!response || !response.csrf) throw new Error("CSRF token not fetched");
    return response.csrf;
  };
  const getTopicList = async (url, csrfToken) => {
    const response = await fetch(url, {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "x-csrf-token": csrfToken,
        "x-requested-with": "XMLHttpRequest"
      },
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include"
    }).then((res) => res.json()).then((res) => {
      return res.topic_list.topics;
    }).catch((err) => {
      console.error(err);
      return [];
    });
    return response;
  };
  const getTopicTrack = async (topicId, csrfToken) => {
    const response = await fetch(`https://linux.do/t/${topicId}/1.json?track_visit=true&forceLoad=true`, {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "discourse-logged-in": "true",
        "discourse-present": "true",
        "discourse-track-view": "true",
        "discourse-track-view-topic-id": `${topicId}`,
        "x-csrf-token": csrfToken,
        "x-requested-with": "XMLHttpRequest"
      },
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include"
    }).then((res) => res.json()).then((res) => {
      return res.id;
    }).catch((err) => {
      console.error(err);
      return [];
    });
    return response;
  };
  const randInt = (start, end) => {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  };
  const randSleep = async (start = 2e3, end = 3e3) => {
    const randSleepTime = randInt(start, end);
    return new Promise((resolve, reject) => {
      setTimeout(resolve, randSleepTime);
    });
  };
  const matchUrl = (url, pattern) => {
    if (typeof url === "string") {
      return pattern.test(url);
    }
    return false;
  };
  const isTopicUrl = (url) => {
    const patternTopic = /^\/t\/[0-9]+\.json($|\?)/;
    const patternPost = /^\/t\/[0-9]+\/[0-9]+\.json($|\?)/;
    return matchUrl(url, patternPost) || matchUrl(url, patternTopic);
  };
  const isTimingsUrl = (url) => {
    const patternTimings = "/topics/timings";
    return url === patternTimings;
  };
  const genRandId = (length = 10) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i += 1) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  function App() {
    const settings = useSettingsContext();
    const nativeXHROpen = require$$0.useRef(XMLHttpRequest.prototype.open);
    const nativeXHRSend = require$$0.useRef(XMLHttpRequest.prototype.send);
    const csrfTokenRef = require$$0.useRef("");
    const processingRef = require$$0.useRef(false);
    const [taskQueue, setTaskQueue] = require$$0.useState([]);
    const [logs, setLogs] = require$$0.useState([]);
    const [lastTaskTime, setLastTaskTime] = require$$0.useState(dayjs("1970-01-01 00:00:00"));
    const [statsData, setStatsData] = require$$0.useState({
      totalSuccess: 0,
      totalFailed: 0,
      totalReadingTime: 0
    });
    require$$0.useState(false);
    const [enableBrowseAssist, setEnableBrowseAssist] = require$$0.useState(false);
    const [activeContent, setActiveContent] = require$$0.useState("console");
    const [isAnimating, setIsAnimating] = require$$0.useState(false);
    const switchContent = (t) => {
      if (t !== activeContent && !isAnimating) {
        setIsAnimating(true);
        setTimeout(() => {
          setActiveContent(t);
          setTimeout(() => {
            setIsAnimating(false);
          }, styles.dialogBodySwitchDuration);
        }, styles.dialogBodySwitchDuration);
      }
    };
    const switchContentCSS = (t) => {
      if (activeContent === t) {
        if (isAnimating) {
          return "animating";
        }
        return "active";
      }
      return "";
    };
    const addLog = require$$0.useCallback(
      (level, message) => {
        setLogs((prevState) => {
          let nextState;
          if (prevState.length >= settings.maxLogLineNum) {
            nextState = prevState.slice(1);
          } else {
            nextState = prevState;
          }
          return [...nextState, { logId: genRandId(), time: dayjs().format("YYYY-MM-DD HH:mm:ss"), level, message }];
        });
      },
      [settings.maxLogLineNum]
    );
    const clearLogs = require$$0.useCallback(() => {
      setLogs([]);
      addLog("info", "日志已清除");
    }, [addLog]);
    const changeTaskStatus = (currentTask, prevState, newStatus) => {
      const nextState = prevState;
      const currentItemIndex = prevState.findIndex((value) => {
        return currentTask.topicId === value.topicId;
      });
      if (currentItemIndex !== -1) {
        nextState[currentItemIndex].status = newStatus;
      }
      return nextState;
    };
    const genReadingPostBatches = (postNums, batchSize) => {
      const batches = [];
      for (let i = 0; i < postNums.length; i += batchSize) {
        batches.push(postNums.slice(i, i + batchSize));
      }
      return batches;
    };
    const genReadingRequestBody = (topicId, postNums) => {
      const readTime = randInt(6e4, 61e3);
      const postParams = postNums.filter((num) => num !== 0).map((num) => `timings%5B${num}%5D=${readTime}`);
      return [...postParams, `topic_time=${readTime}`, `topic_id=${topicId}`].join("&");
    };
    const handleReadingPosts = require$$0.useCallback(
      async (task) => {
        const { topicId, postNums, csrfToken, maxReadPosts, actionType, status } = task;
        await getTopicTrack(topicId, csrfToken);
        const readingPostBatches = genReadingPostBatches(postNums, maxReadPosts);
        for (const readingPostBatch of readingPostBatches) {
          let retryCount = 0;
          let success = false;
          while (!success && retryCount <= settings.maxRetryTimes) {
            try {
              const readingRequestBody = genReadingRequestBody(topicId, readingPostBatch);
              const response = await fetch("https://linux.do/topics/timings", {
                method: "POST",
                headers: {
                  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "discourse-background": "true",
                  "discourse-logged-in": "true",
                  "discourse-present": "true",
                  "x-csrf-token": csrfToken,
                  "x-requested-with": "XMLHttpRequest",
                  "x-silence-logger": "true"
                },
                referrer: `https://linux.do/t/topic/${topicId}/1`,
                body: readingRequestBody,
                mode: "cors",
                credentials: "include"
              });
              if (response.ok) {
                addLog(
                  "success",
                  `已完成话题[${topicId}]第${readingPostBatch[0]}至${readingPostBatch[readingPostBatch.length - 1]}层阅读`
                );
                success = true;
                retryCount = 0;
                await randSleep(1e3, 2e3);
              } else if (response.status >= 400 && response.status < 600) {
                retryCount += 1;
                addLog(
                  "warning",
                  `阅读话题[${topicId}]出现错误(${response.status})！正在重试(${retryCount}/${settings.maxRetryTimes})……`
                );
                setTaskQueue((prevState) => {
                  return changeTaskStatus(task, prevState, "retrying");
                });
                await randSleep(3e3, 5e3);
              } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
              }
            } catch (error) {
              console.error(error);
              retryCount += 1;
              addLog("error", `阅读话题[${topicId}]发生未知错误: ${error.message}`);
              await randSleep(3e3, 5e3);
            }
          }
          if (!success) {
            return { topicId, error: true, detail: "超过最大重试次数" };
          }
        }
        return { topicId, error: false, detail: "已完成阅读" };
      },
      [addLog, settings.maxRetryTimes]
    );
    const processQueue = require$$0.useCallback(async () => {
      if (taskQueue.length > 0) {
        const task = taskQueue[0];
        addLog("info", `正在阅读：${task.topicId}`);
        setTaskQueue((prevState) => {
          processingRef.current = true;
          return changeTaskStatus(task, prevState, "processing");
        });
        try {
          const readingRes = await handleReadingPosts(task);
          const finishTime = dayjs();
          const timeDiff = finishTime.diff(lastTaskTime);
          if (readingRes.error) {
            setStatsData((prevState) => {
              return {
                ...prevState,
                totalFailed: prevState.totalFailed + 1
              };
            });
            setTaskQueue((prevState) => {
              return changeTaskStatus(task, prevState, "failed");
            });
            addLog("error", readingRes.detail);
          } else {
            setStatsData((prevState) => {
              return {
                ...prevState,
                totalSuccess: prevState.totalSuccess + 1,
                totalReadingTime: prevState.totalReadingTime + Math.min(timeDiff, 6e4)
              };
            });
            setLastTaskTime(finishTime);
            setTaskQueue((prevState) => {
              return changeTaskStatus(task, prevState, "completed");
            });
            addLog("success", `任务已完成：${task.topicId}`);
          }
        } catch (err) {
          console.error(err);
          setStatsData((prevState) => {
            return {
              ...prevState,
              totalFailed: prevState.totalFailed + 1
            };
          });
          setTaskQueue((prevState) => {
            return changeTaskStatus(task, prevState, "failed");
          });
          addLog("error", `处理任务时发生错误：${err.message}`);
        }
        setTaskQueue((prevState) => {
          const nextState = prevState.filter((t) => t.taskId !== task.taskId);
          processingRef.current = false;
          return nextState;
        });
      }
    }, [addLog, handleReadingPosts, lastTaskTime, taskQueue]);
    const addTask = require$$0.useCallback(
      ({ topicId, postNums, csrfToken, maxReadPosts, actionType }) => {
        if (enableBrowseAssist) {
          setTaskQueue((prevState) => {
            const isDuplicate = prevState.some((task) => task.topicId === topicId);
            if (!isDuplicate) {
              const nextState = [
                ...prevState,
                {
                  taskId: genRandId(),
                  topicId,
                  postNums,
                  csrfToken,
                  maxReadPosts,
                  actionType,
                  status: "pending"
                }
              ];
              addLog("info", `任务已添加，目前队列长度：${nextState.length}`);
              return nextState;
            }
            return prevState;
          });
        }
      },
      [addLog, enableBrowseAssist]
    );
    const addInitTask = require$$0.useCallback(async () => {
      let csrfToken;
      if (csrfTokenRef.current) {
        csrfToken = csrfTokenRef.current;
      } else {
        csrfToken = await getCsrfToken(settings.getCsrfTokenFromHtml);
      }
      let unseenTopics = await getTopicList("https://linux.do/unseen.json?order=created&ascending=true", csrfToken);
      if (unseenTopics.length === 0) {
        unseenTopics = await getTopicList("https://linux.do/unread.json?order=created&ascending=true", csrfToken);
      }
      if (unseenTopics.length === 0) {
        unseenTopics = await getTopicList("https://linux.do/new.json?order=created&ascending=true", csrfToken);
      }
      if (unseenTopics.length === 0) {
        const postNums = Array.from({ length: 500 }, (v, k2) => k2 + 1);
        addTask({
          topicId: 111891,
          postNums,
          csrfToken,
          maxReadPosts: settings.singlePostsReading,
          actionType: "无限月读"
        });
      } else {
        unseenTopics.forEach((unseenTopic) => {
          const highestPostNumber = unseenTopic.highest_post_number;
          let lastReadPostNumber;
          if (settings.readAllPostsInTopic) {
            lastReadPostNumber = 1;
          } else {
            lastReadPostNumber = unseenTopic.last_read_post_number || 1;
          }
          const postNums = Array.from(
            { length: highestPostNumber - lastReadPostNumber + 1 },
            (v, k2) => k2 + lastReadPostNumber
          );
          addTask({
            topicId: unseenTopic.id,
            postNums,
            csrfToken,
            maxReadPosts: settings.singlePostsReading,
            actionType: "清理未读"
          });
        });
      }
    }, [addTask, settings.getCsrfTokenFromHtml, settings.readAllPostsInTopic, settings.singlePostsReading]);
    const readTopic = require$$0.useCallback(
      async (topicData) => {
        let csrfToken;
        if (csrfTokenRef.current) {
          csrfToken = csrfTokenRef.current;
        } else {
          csrfToken = await getCsrfToken(settings.getCsrfTokenFromHtml);
        }
        const highestPostNumber = topicData.highest_post_number;
        let lastReadPostNumber;
        console.log(settings.readAllPostsInTopic);
        if (settings.readAllPostsInTopic) {
          lastReadPostNumber = 1;
        } else {
          lastReadPostNumber = topicData.last_read_post_number || 1;
        }
        const postNums = Array.from(
          { length: highestPostNumber - lastReadPostNumber + 1 },
          (v, k2) => k2 + lastReadPostNumber
        );
        addTask({
          topicId: topicData.id,
          postNums,
          csrfToken,
          maxReadPosts: settings.singlePostsReading,
          actionType: "主动出击"
        });
      },
      [addTask, settings.getCsrfTokenFromHtml, settings.readAllPostsInTopic, settings.singlePostsReading]
    );
    const handleProcessTopic = (request) => {
      try {
        const topicData = JSON.parse(request.response);
        readTopic(topicData);
      } catch (err) {
        console.error(err);
        addLog("error", "未知错误，请查看控制台！");
      }
    };
    const enableXMLHttpRequestHooks = () => {
      XMLHttpRequest.prototype.open = function(method, url, async, username, password) {
        if (typeof url === "string" && isTimingsUrl(url)) {
          return;
        }
        if (url instanceof URL && isTimingsUrl(url.pathname)) {
          return;
        }
        this._custom_storage = { method, url };
        return nativeXHROpen.current.apply(this, arguments);
      };
      XMLHttpRequest.prototype.send = function(data) {
        this.addEventListener(
          "readystatechange",
          function() {
            if (this.readyState === 4) {
              if (isTopicUrl(this._custom_storage.url) && this._custom_storage.method === "GET") {
                handleProcessTopic(this);
              }
            }
          },
          false
        );
        return nativeXHRSend.current.apply(this, arguments);
      };
    };
    const disableXMLHttpRequestHooks = () => {
      XMLHttpRequest.prototype.open = nativeXHROpen.current;
      XMLHttpRequest.prototype.send = nativeXHRSend.current;
    };
    require$$0.useEffect(() => {
      const start = () => {
        enableXMLHttpRequestHooks();
        addLog("success", "助手已开启");
        addLog("success", "未读拦截已开启");
      };
      const stop = () => {
        disableXMLHttpRequestHooks();
        if (taskQueue.length > 1) {
          addLog("warning", "正在删除多余任务，仅保留最后进行的任务");
          setTaskQueue((prevState) => prevState.slice(0, 1));
        }
        addLog("error", "助手已停止");
      };
      if (enableBrowseAssist) {
        start();
      } else {
        stop();
      }
    }, [enableBrowseAssist]);
    require$$0.useEffect(() => {
      const processNextTask = async () => {
        if (enableBrowseAssist && taskQueue.length > 0 && !processingRef.current) {
          await randSleep(3e3, 5e3);
          if (enableBrowseAssist && taskQueue.length > 0 && !processingRef.current) {
            await processQueue();
          }
        }
      };
      if (enableBrowseAssist) {
        processNextTask();
      }
    }, [enableBrowseAssist, processQueue, taskQueue, taskQueue.length]);
    require$$0.useEffect(() => {
      const readingInfinite = async () => {
        if (enableBrowseAssist && taskQueue.length === 0 && !processingRef.current) {
          await randSleep(1e4, 15e3);
          if (enableBrowseAssist && taskQueue.length === 0 && !processingRef.current) {
            await addInitTask();
          }
        }
      };
      if (enableBrowseAssist) {
        readingInfinite();
      }
    }, [addInitTask, enableBrowseAssist, taskQueue, taskQueue.length]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IconButton,
        {
          id: styles.browseButton,
          title: "疯狂阅读",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M4 6h16M4 12h16m-7 6h7" }),
          onClick: settings.onToggleDialog
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          id: styles.browseContainer,
          className: `d-modal__container ${settings.openDialog ? "open" : ""}`,
          style: { width: settings.uiWidth },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-modal__header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id: "discourse-modal-title", className: "d-modal__title-text", style: { flex: 1 }, children: "Task Queue & Logs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FuncIconButton,
                {
                  title: `${enableBrowseAssist ? "停止" : "开始"}`,
                  "aria-label": `${enableBrowseAssist ? "停止" : "开始"}`,
                  onClick: () => setEnableBrowseAssist((prevState) => !prevState),
                  style: { flex: 0 },
                  icon: enableBrowseAssist ? "circle-stop" : "play"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FuncIconButton,
                {
                  title: "设置",
                  "aria-label": "设置",
                  onClick: () => switchContent("settings"),
                  style: { flex: 0 },
                  icon: "gear"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FuncIconButton,
                {
                  title: "控制台",
                  "aria-label": "控制台",
                  onClick: () => switchContent("console"),
                  style: { flex: 0 },
                  icon: "code"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FuncIconButton,
                {
                  title: "关闭",
                  "aria-label": "关闭",
                  onClick: settings.onCloseDialog,
                  style: { flex: 0 },
                  icon: "xmark"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-modal__body", style: { padding: "0.5rem" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${styles.dialogBodyName} ${switchContentCSS("console")}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConsoleSection, { taskQueue, logs, statsData, onClearLogs: clearLogs }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${styles.dialogBodyName} ${switchContentCSS("settings")}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, {}) })
            ] })
          ]
        }
      )
    ] });
  }
  const createLinuxDoBrowse = () => {
    const app = document.createElement("div");
    app.setAttribute("id", styles.browseName);
    document.body.appendChild(app);
    return app;
  };
  client.createRoot(createLinuxDoBrowse()).render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(require$$0.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsProvider, { settings: DEFAULT_APP_SETTINGS, caches: "localStorage", children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) })
  );

})(React, _, ReactDOM, dayjs, dayjs_plugin_duration);
