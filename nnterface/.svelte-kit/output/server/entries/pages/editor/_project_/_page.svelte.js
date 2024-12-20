import { q as is_array, a1 as get_prototype_of, a2 as object_prototype, a3 as current_component, Q as push, a4 as fallback, V as getContext$1, X as store_get, $ as attr, a0 as stringify, a5 as slot, Y as unsubscribe_stores, T as bind_props, S as pop, a6 as rest_props, W as escape_html, a7 as sanitize_props, a8 as add_styles, a9 as merge_styles, R as setContext$1, Z as ensure_array_like, aa as spread_props, ab as store_set, ac as spread_attributes, ad as sanitize_slots, ae as hasContext, af as element, ag as once, ah as getAllContexts, ai as copy_payload, aj as assign_payload, ak as run, _ as head } from "../../../../chunks/index.js";
import { g as get$1, w as writable, r as readable, d as derived } from "../../../../chunks/index3.js";
import cc from "classcat";
import { Position, ConnectionMode, areConnectionMapsEqual, handleConnectionChange, errorMessages, getBezierPath, getSmoothStepPath, getStraightPath, infiniteExtent, adoptUserNodes, updateConnectionLookup, getInternalNodesBounds, getViewportForBounds, SelectionMode, ConnectionLineType, initialConnection, devWarn, isEdgeVisible, getEdgePosition, getElevatedEdgeZIndex, getNodesInside, getElementsToRemove, addEdge, updateNodeInternals, updateAbsolutePositions, getDimensions, getFitViewNodes, fitView, panBy, pointToRendererPoint, createMarkerIds, nodeHasDimensions, getMarkerId, MarkerType, isNumeric, isMacOs, getConnectionStatus, PanOnScrollMode, isNodeBase, isRectObject, nodeToRect, getOverlappingArea, rendererPointToPoint, getNodesBounds, evaluateAbsolutePosition, ResizeControlVariant } from "@xyflow/system";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import "chart.js/auto";
import { tv } from "tailwind-variants";
import "@observablehq/plot";
import parse from "style-to-object";
import { computePosition, offset, shift, limitShift, flip, size, arrow, hide, autoUpdate } from "@floating-ui/dom";
import { basicSetup } from "codemirror";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { indentWithTab } from "@codemirror/commands";
import { indentUnit } from "@codemirror/language";
import { python } from "@codemirror/lang-python";
import { githubDark } from "@uiw/codemirror-theme-github";
import hljs from "highlight.js/lib/core";
import python$1 from "highlight.js/lib/languages/python";
const empty = [];
function snapshot(value, skip_warning = false) {
  return clone(value, /* @__PURE__ */ new Map(), "", empty);
}
function clone(value, cloned, path, paths, original = null) {
  if (typeof value === "object" && value !== null) {
    const unwrapped = cloned.get(value);
    if (unwrapped !== void 0) return unwrapped;
    if (value instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(value)
    );
    if (value instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(value)
    );
    if (is_array(value)) {
      const copy = (
        /** @type {Snapshot<any>} */
        []
      );
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (let i = 0; i < value.length; i += 1) {
        copy.push(clone(value[i], cloned, path, paths));
      }
      return copy;
    }
    if (get_prototype_of(value) === object_prototype) {
      const copy = {};
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var key2 in value) {
        copy[key2] = clone(value[key2], cloned, path, paths);
      }
      return copy;
    }
    if (value instanceof Date) {
      return (
        /** @type {Snapshot<T>} */
        structuredClone(value)
      );
    }
    if (typeof /** @type {T & { toJSON?: any } } */
    value.toJSON === "function") {
      return clone(
        /** @type {T & { toJSON(): any } } */
        value.toJSON(),
        cloned,
        path,
        paths,
        // Associate the instance with the toJSON clone
        value
      );
    }
  }
  if (value instanceof EventTarget) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(value)
    );
  } catch (e) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
}
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
async function tick() {
}
function Handle($$payload, $$props) {
  push();
  var $$store_subs;
  let isTarget, isConnectable, handleId, connectionInProcess, connectingFrom, connectingTo, isPossibleEndHandle, valid;
  let id = fallback($$props["id"], void 0);
  let type = fallback($$props["type"], "source");
  let position = fallback($$props["position"], () => Position.Top, true);
  let style = fallback($$props["style"], void 0);
  let isValidConnection = fallback($$props["isValidConnection"], void 0);
  let onconnect = fallback($$props["onconnect"], void 0);
  let ondisconnect = fallback($$props["ondisconnect"], void 0);
  let isConnectableProp = fallback($$props["isConnectable"], void 0);
  let className = fallback($$props["class"], void 0);
  const nodeId = getContext$1("svelteflow__node_id");
  const connectable = getContext$1("svelteflow__node_connectable");
  const store = useStore();
  const {
    connectionMode,
    domNode,
    nodeLookup,
    connectionRadius,
    viewport,
    isValidConnection: isValidConnectionStore,
    lib,
    addEdge: addEdge2,
    onedgecreate,
    panBy: panBy2,
    cancelConnection,
    updateConnection,
    autoPanOnConnect,
    edges,
    connectionLookup,
    onconnect: onConnectAction,
    onconnectstart: onConnectStartAction,
    onconnectend: onConnectEndAction,
    flowId,
    connection
  } = store;
  let prevConnections = null;
  let connections2;
  isTarget = type === "target";
  isConnectable = isConnectableProp !== void 0 ? isConnectableProp : store_get($$store_subs ??= {}, "$connectable", connectable);
  handleId = id || null;
  if (onconnect || ondisconnect) {
    store_get($$store_subs ??= {}, "$edges", edges);
    connections2 = store_get($$store_subs ??= {}, "$connectionLookup", connectionLookup).get(`${nodeId}-${type}-${id || null}`);
  }
  {
    if (prevConnections && !areConnectionMapsEqual(connections2, prevConnections)) {
      const _connections = connections2 ?? /* @__PURE__ */ new Map();
      handleConnectionChange(prevConnections, _connections, ondisconnect);
      handleConnectionChange(_connections, prevConnections, onconnect);
    }
    prevConnections = connections2 ?? /* @__PURE__ */ new Map();
  }
  connectionInProcess = !!store_get($$store_subs ??= {}, "$connection", connection).fromHandle;
  connectingFrom = store_get($$store_subs ??= {}, "$connection", connection).fromHandle?.nodeId === nodeId && store_get($$store_subs ??= {}, "$connection", connection).fromHandle?.type === type && store_get($$store_subs ??= {}, "$connection", connection).fromHandle?.id === handleId;
  connectingTo = store_get($$store_subs ??= {}, "$connection", connection).toHandle?.nodeId === nodeId && store_get($$store_subs ??= {}, "$connection", connection).toHandle?.type === type && store_get($$store_subs ??= {}, "$connection", connection).toHandle?.id === handleId;
  isPossibleEndHandle = store_get($$store_subs ??= {}, "$connectionMode", connectionMode) === ConnectionMode.Strict ? store_get($$store_subs ??= {}, "$connection", connection).fromHandle?.type !== type : nodeId !== store_get($$store_subs ??= {}, "$connection", connection).fromHandle?.nodeId || handleId !== store_get($$store_subs ??= {}, "$connection", connection).fromHandle?.id;
  valid = connectingTo && store_get($$store_subs ??= {}, "$connection", connection).isValid;
  $$payload.out += `<div${attr("data-handleid", handleId)}${attr("data-nodeid", nodeId)}${attr("data-handlepos", position)}${attr("data-id", `${stringify(store_get($$store_subs ??= {}, "$flowId", flowId))}-${stringify(nodeId)}-${stringify(id || null)}-${stringify(type)}`)}${attr("class", `${stringify(cc([
    "svelte-flow__handle",
    `svelte-flow__handle-${position}`,
    "nodrag",
    "nopan",
    position,
    className
  ]))} ${stringify([
    valid ? "valid" : "",
    connectingTo ? "connectingto" : "",
    connectingFrom ? "connectingfrom" : "",
    !isTarget ? "source" : "",
    isTarget ? "target" : "",
    isConnectable ? "connectablestart" : "",
    isConnectable ? "connectableend" : "",
    isConnectable ? "connectable" : "",
    isConnectable && (!connectionInProcess || isPossibleEndHandle) ? "connectionindicator" : ""
  ].filter(Boolean).join(" "))}`)}${attr("style", style)} role="button" tabindex="-1"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    id,
    type,
    position,
    style,
    isValidConnection,
    onconnect,
    ondisconnect,
    isConnectable: isConnectableProp,
    class: className
  });
  pop();
}
function DefaultNode($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, ["data", "targetPosition", "sourcePosition"]);
  push();
  let data = fallback($$props["data"], () => ({ label: "Node" }), true);
  let targetPosition = fallback($$props["targetPosition"], void 0);
  let sourcePosition = fallback($$props["sourcePosition"], void 0);
  Handle($$payload, {
    type: "target",
    position: targetPosition ?? Position.Top
  });
  $$payload.out += `<!----> ${escape_html(data?.label)} `;
  Handle($$payload, {
    type: "source",
    position: sourcePosition ?? Position.Bottom
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { data, targetPosition, sourcePosition });
  pop();
}
function InputNode($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, ["data", "sourcePosition"]);
  push();
  let data = fallback($$props["data"], () => ({ label: "Node" }), true);
  let sourcePosition = fallback($$props["sourcePosition"], void 0);
  $$payload.out += `<!---->${escape_html(data?.label)} `;
  Handle($$payload, {
    type: "source",
    position: sourcePosition ?? Position.Bottom
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { data, sourcePosition });
  pop();
}
function OutputNode($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, ["data", "targetPosition"]);
  push();
  let data = fallback($$props["data"], () => ({ label: "Node" }), true);
  let targetPosition = fallback($$props["targetPosition"], void 0);
  $$payload.out += `<!---->${escape_html(data?.label)} `;
  Handle($$payload, {
    type: "target",
    position: targetPosition ?? Position.Top
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { data, targetPosition });
  pop();
}
function GroupNode($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, []);
}
function EdgeLabelRenderer($$payload, $$props) {
  push();
  useStore();
  $$payload.out += `<div><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div>`;
  pop();
}
function useHandleEdgeSelect() {
  const { edgeLookup, selectionRect, selectionRectMode, multiselectionKeyPressed, addSelectedEdges, unselectNodesAndEdges, elementsSelectable } = useStore();
  return (id) => {
    const edge = get$1(edgeLookup).get(id);
    if (!edge) {
      console.warn("012", errorMessages["error012"](id));
      return;
    }
    const selectable = edge.selectable || get$1(elementsSelectable) && typeof edge.selectable === "undefined";
    if (selectable) {
      selectionRect.set(null);
      selectionRectMode.set(null);
      if (!edge.selected) {
        addSelectedEdges([id]);
      } else if (edge.selected && get$1(multiselectionKeyPressed)) {
        unselectNodesAndEdges({ nodes: [], edges: [edge] });
      }
    }
  };
}
function EdgeLabel($$payload, $$props) {
  push();
  let style = fallback($$props["style"], void 0);
  let x = fallback($$props["x"], void 0);
  let y = fallback($$props["y"], void 0);
  useHandleEdgeSelect();
  getContext$1("svelteflow__edge_id");
  EdgeLabelRenderer($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<div${add_styles(merge_styles("pointer-events: all;" + style, {
        transform: `translate(-50%, -50%) translate(${stringify(x)}px,${stringify(y)}px)`
      }))} class="svelte-flow__edge-label" role="button" tabindex="-1"><!---->`;
      slot($$payload2, $$props, "default", {});
      $$payload2.out += `<!----></div>`;
    },
    $$slots: { default: true }
  });
  bind_props($$props, { style, x, y });
  pop();
}
function BaseEdge($$payload, $$props) {
  push();
  let id = fallback($$props["id"], void 0);
  let path = $$props["path"];
  let label = fallback($$props["label"], void 0);
  let labelX = fallback($$props["labelX"], void 0);
  let labelY = fallback($$props["labelY"], void 0);
  let labelStyle = fallback($$props["labelStyle"], void 0);
  let markerStart = fallback($$props["markerStart"], void 0);
  let markerEnd = fallback($$props["markerEnd"], void 0);
  let style = fallback($$props["style"], void 0);
  let interactionWidth = fallback($$props["interactionWidth"], 20);
  let className = fallback($$props["class"], void 0);
  let interactionWidthValue = interactionWidth === void 0 ? 20 : interactionWidth;
  $$payload.out += `<path${attr("id", id)}${attr("d", path)}${attr("class", cc(["svelte-flow__edge-path", className]))}${attr("marker-start", markerStart)}${attr("marker-end", markerEnd)} fill="none"${attr("style", style)}></path>`;
  if (interactionWidthValue) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<path${attr("d", path)}${attr("stroke-opacity", 0)}${attr("stroke-width", interactionWidthValue)} fill="none" class="svelte-flow__edge-interaction"></path>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if (label) {
    $$payload.out += "<!--[-->";
    EdgeLabel($$payload, {
      x: labelX,
      y: labelY,
      style: labelStyle,
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(label)}`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    id,
    path,
    label,
    labelX,
    labelY,
    labelStyle,
    markerStart,
    markerEnd,
    style,
    interactionWidth,
    class: className
  });
  pop();
}
function BezierEdgeInternal($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, [
    "label",
    "labelStyle",
    "style",
    "markerStart",
    "markerEnd",
    "interactionWidth",
    "sourceX",
    "sourceY",
    "sourcePosition",
    "targetX",
    "targetY",
    "targetPosition"
  ]);
  push();
  let path, labelX, labelY;
  let label = fallback($$props["label"], void 0);
  let labelStyle = fallback($$props["labelStyle"], void 0);
  let style = fallback($$props["style"], void 0);
  let markerStart = fallback($$props["markerStart"], void 0);
  let markerEnd = fallback($$props["markerEnd"], void 0);
  let interactionWidth = fallback($$props["interactionWidth"], void 0);
  let sourceX = $$props["sourceX"];
  let sourceY = $$props["sourceY"];
  let sourcePosition = $$props["sourcePosition"];
  let targetX = $$props["targetX"];
  let targetY = $$props["targetY"];
  let targetPosition = $$props["targetPosition"];
  [path, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });
  BaseEdge($$payload, {
    path,
    labelX,
    labelY,
    label,
    labelStyle,
    markerStart,
    markerEnd,
    interactionWidth,
    style
  });
  bind_props($$props, {
    label,
    labelStyle,
    style,
    markerStart,
    markerEnd,
    interactionWidth,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  pop();
}
function SmoothStepEdgeInternal($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, [
    "label",
    "labelStyle",
    "style",
    "markerStart",
    "markerEnd",
    "interactionWidth",
    "sourceX",
    "sourceY",
    "sourcePosition",
    "targetX",
    "targetY",
    "targetPosition"
  ]);
  push();
  let path, labelX, labelY;
  let label = fallback($$props["label"], void 0);
  let labelStyle = fallback($$props["labelStyle"], void 0);
  let style = fallback($$props["style"], void 0);
  let markerStart = fallback($$props["markerStart"], void 0);
  let markerEnd = fallback($$props["markerEnd"], void 0);
  let interactionWidth = fallback($$props["interactionWidth"], void 0);
  let sourceX = $$props["sourceX"];
  let sourceY = $$props["sourceY"];
  let sourcePosition = $$props["sourcePosition"];
  let targetX = $$props["targetX"];
  let targetY = $$props["targetY"];
  let targetPosition = $$props["targetPosition"];
  [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });
  BaseEdge($$payload, {
    path,
    labelX,
    labelY,
    label,
    labelStyle,
    markerStart,
    markerEnd,
    interactionWidth,
    style
  });
  bind_props($$props, {
    label,
    labelStyle,
    style,
    markerStart,
    markerEnd,
    interactionWidth,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  pop();
}
function StraightEdgeInternal($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, [
    "label",
    "labelStyle",
    "style",
    "markerStart",
    "markerEnd",
    "interactionWidth",
    "sourceX",
    "sourceY",
    "targetX",
    "targetY"
  ]);
  push();
  let path, labelX, labelY;
  let label = fallback($$props["label"], void 0);
  let labelStyle = fallback($$props["labelStyle"], void 0);
  let style = fallback($$props["style"], void 0);
  let markerStart = fallback($$props["markerStart"], void 0);
  let markerEnd = fallback($$props["markerEnd"], void 0);
  let interactionWidth = fallback($$props["interactionWidth"], void 0);
  let sourceX = $$props["sourceX"];
  let sourceY = $$props["sourceY"];
  let targetX = $$props["targetX"];
  let targetY = $$props["targetY"];
  [path, labelX, labelY] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  BaseEdge($$payload, {
    path,
    labelX,
    labelY,
    label,
    labelStyle,
    markerStart,
    markerEnd,
    interactionWidth,
    style
  });
  bind_props($$props, {
    label,
    labelStyle,
    style,
    markerStart,
    markerEnd,
    interactionWidth,
    sourceX,
    sourceY,
    targetX,
    targetY
  });
  pop();
}
function StepEdgeInternal($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  rest_props($$sanitized_props, [
    "label",
    "labelStyle",
    "style",
    "markerStart",
    "markerEnd",
    "interactionWidth",
    "sourceX",
    "sourceY",
    "sourcePosition",
    "targetX",
    "targetY",
    "targetPosition"
  ]);
  push();
  let path, labelX, labelY;
  let label = fallback($$props["label"], void 0);
  let labelStyle = fallback($$props["labelStyle"], void 0);
  let style = fallback($$props["style"], void 0);
  let markerStart = fallback($$props["markerStart"], void 0);
  let markerEnd = fallback($$props["markerEnd"], void 0);
  let interactionWidth = fallback($$props["interactionWidth"], void 0);
  let sourceX = $$props["sourceX"];
  let sourceY = $$props["sourceY"];
  let sourcePosition = $$props["sourcePosition"];
  let targetX = $$props["targetX"];
  let targetY = $$props["targetY"];
  let targetPosition = $$props["targetPosition"];
  [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 0
  });
  BaseEdge($$payload, {
    path,
    labelX,
    labelY,
    label,
    labelStyle,
    markerStart,
    markerEnd,
    interactionWidth,
    style
  });
  bind_props($$props, {
    label,
    labelStyle,
    style,
    markerStart,
    markerEnd,
    interactionWidth,
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });
  pop();
}
function syncNodeStores(nodesStore, userNodesStore) {
  const nodesStoreSetter = nodesStore.set;
  const userNodesStoreSetter = userNodesStore.set;
  const currentNodesStore = get$1(nodesStore);
  const currentUserNodesStore = get$1(userNodesStore);
  const initWithUserNodes = currentNodesStore.length === 0 && currentUserNodesStore.length > 0;
  let val = initWithUserNodes ? currentUserNodesStore : currentNodesStore;
  nodesStore.set(val);
  const _set = (nds) => {
    const updatedNodes = nodesStoreSetter(nds);
    val = updatedNodes;
    userNodesStoreSetter(val);
    return updatedNodes;
  };
  nodesStore.set = userNodesStore.set = _set;
  nodesStore.update = userNodesStore.update = (fn) => _set(fn(val));
}
function syncEdgeStores(edgesStore, userEdgesStore) {
  const nodesStoreSetter = edgesStore.set;
  const userEdgesStoreSetter = userEdgesStore.set;
  let val = get$1(userEdgesStore);
  edgesStore.set(val);
  const _set = (eds) => {
    nodesStoreSetter(eds);
    userEdgesStoreSetter(eds);
    val = eds;
  };
  edgesStore.set = userEdgesStore.set = _set;
  edgesStore.update = userEdgesStore.update = (fn) => _set(fn(val));
}
const syncViewportStores = (panZoomStore, viewportStore, userViewportStore) => {
  if (!userViewportStore) {
    return;
  }
  const panZoom = get$1(panZoomStore);
  const viewportStoreSetter = viewportStore.set;
  const userViewportStoreSetter = userViewportStore.set;
  let val = userViewportStore ? get$1(userViewportStore) : { x: 0, y: 0, zoom: 1 };
  viewportStore.set(val);
  viewportStore.set = (vp) => {
    viewportStoreSetter(vp);
    userViewportStoreSetter(vp);
    val = vp;
    return vp;
  };
  userViewportStore.set = (vp) => {
    panZoom?.syncViewport(vp);
    viewportStoreSetter(vp);
    userViewportStoreSetter(vp);
    val = vp;
    return vp;
  };
  viewportStore.update = (fn) => {
    viewportStore.set(fn(val));
  };
  userViewportStore.update = (fn) => {
    userViewportStore.set(fn(val));
  };
};
const createNodesStore = (nodes, nodeLookup, parentLookup, nodeOrigin = [0, 0], nodeExtent = infiniteExtent) => {
  const { subscribe, set, update } = writable([]);
  let value = nodes;
  let defaults = {};
  let elevateNodesOnSelect = true;
  const _set = (nds) => {
    adoptUserNodes(nds, nodeLookup, parentLookup, {
      elevateNodesOnSelect,
      nodeOrigin,
      nodeExtent,
      defaults,
      checkEquality: false
    });
    value = nds;
    set(value);
    return value;
  };
  const _update = (fn) => _set(fn(value));
  const setDefaultOptions = (options) => {
    defaults = options;
  };
  const setOptions = (options) => {
    elevateNodesOnSelect = options.elevateNodesOnSelect ?? elevateNodesOnSelect;
  };
  _set(value);
  return {
    subscribe,
    set: _set,
    update: _update,
    setDefaultOptions,
    setOptions
  };
};
const createEdgesStore = (edges, connectionLookup, edgeLookup, defaultOptions) => {
  const { subscribe, set, update } = writable([]);
  let value = edges;
  let defaults = {};
  const _set = (eds) => {
    const nextEdges = defaults ? eds.map((edge) => ({ ...defaults, ...edge })) : eds;
    updateConnectionLookup(connectionLookup, edgeLookup, nextEdges);
    value = nextEdges;
    set(value);
  };
  const _update = (fn) => _set(fn(value));
  const setDefaultOptions = (options) => {
    defaults = options;
  };
  _set(value);
  return {
    subscribe,
    set: _set,
    update: _update,
    setDefaultOptions
  };
};
const initialNodeTypes = {
  input: InputNode,
  output: OutputNode,
  default: DefaultNode,
  group: GroupNode
};
const initialEdgeTypes = {
  straight: StraightEdgeInternal,
  smoothstep: SmoothStepEdgeInternal,
  default: BezierEdgeInternal,
  step: StepEdgeInternal
};
const getInitialStore = ({ nodes = [], edges = [], width, height, fitView: fitView2, nodeOrigin, nodeExtent }) => {
  const nodeLookup = /* @__PURE__ */ new Map();
  const parentLookup = /* @__PURE__ */ new Map();
  const connectionLookup = /* @__PURE__ */ new Map();
  const edgeLookup = /* @__PURE__ */ new Map();
  const storeNodeOrigin = nodeOrigin ?? [0, 0];
  const storeNodeExtent = nodeExtent ?? infiniteExtent;
  adoptUserNodes(nodes, nodeLookup, parentLookup, {
    nodeExtent: storeNodeExtent,
    nodeOrigin: storeNodeOrigin,
    elevateNodesOnSelect: false,
    checkEquality: false
  });
  updateConnectionLookup(connectionLookup, edgeLookup, edges);
  let viewport = { x: 0, y: 0, zoom: 1 };
  if (fitView2 && width && height) {
    const bounds = getInternalNodesBounds(nodeLookup, {
      filter: (node) => !!((node.width || node.initialWidth) && (node.height || node.initialHeight))
    });
    viewport = getViewportForBounds(bounds, width, height, 0.5, 2, 0.1);
  }
  return {
    flowId: writable(null),
    nodes: createNodesStore(nodes, nodeLookup, parentLookup, storeNodeOrigin, storeNodeExtent),
    nodeLookup: readable(nodeLookup),
    parentLookup: readable(parentLookup),
    edgeLookup: readable(edgeLookup),
    visibleNodes: readable([]),
    edges: createEdgesStore(edges, connectionLookup, edgeLookup),
    visibleEdges: readable([]),
    connectionLookup: readable(connectionLookup),
    height: writable(500),
    width: writable(500),
    minZoom: writable(0.5),
    maxZoom: writable(2),
    nodeOrigin: writable(storeNodeOrigin),
    nodeDragThreshold: writable(1),
    nodeExtent: writable(storeNodeExtent),
    translateExtent: writable(infiniteExtent),
    autoPanOnNodeDrag: writable(true),
    autoPanOnConnect: writable(true),
    fitViewOnInit: writable(false),
    fitViewOnInitDone: writable(false),
    fitViewOptions: writable(void 0),
    panZoom: writable(null),
    snapGrid: writable(null),
    dragging: writable(false),
    selectionRect: writable(null),
    selectionKeyPressed: writable(false),
    multiselectionKeyPressed: writable(false),
    deleteKeyPressed: writable(false),
    panActivationKeyPressed: writable(false),
    zoomActivationKeyPressed: writable(false),
    selectionRectMode: writable(null),
    selectionMode: writable(SelectionMode.Partial),
    nodeTypes: writable(initialNodeTypes),
    edgeTypes: writable(initialEdgeTypes),
    viewport: writable(viewport),
    connectionMode: writable(ConnectionMode.Strict),
    domNode: writable(null),
    connection: readable(initialConnection),
    connectionLineType: writable(ConnectionLineType.Bezier),
    connectionRadius: writable(20),
    isValidConnection: writable(() => true),
    nodesDraggable: writable(true),
    nodesConnectable: writable(true),
    elementsSelectable: writable(true),
    selectNodesOnDrag: writable(true),
    markers: readable([]),
    defaultMarkerColor: writable("#b1b1b7"),
    lib: readable("svelte"),
    onlyRenderVisibleElements: writable(false),
    onerror: writable(devWarn),
    ondelete: writable(void 0),
    onedgecreate: writable(void 0),
    onconnect: writable(void 0),
    onconnectstart: writable(void 0),
    onconnectend: writable(void 0),
    onbeforedelete: writable(void 0),
    nodesInitialized: writable(false),
    edgesInitialized: writable(false),
    viewportInitialized: writable(false),
    initialized: readable(false)
  };
};
function getVisibleEdges(store) {
  const visibleEdges = derived([
    store.edges,
    store.nodes,
    store.nodeLookup,
    store.onlyRenderVisibleElements,
    store.viewport,
    store.width,
    store.height
  ], ([edges, , nodeLookup, onlyRenderVisibleElements, viewport, width, height]) => {
    const visibleEdges2 = onlyRenderVisibleElements && width && height ? edges.filter((edge) => {
      const sourceNode = nodeLookup.get(edge.source);
      const targetNode = nodeLookup.get(edge.target);
      return sourceNode && targetNode && isEdgeVisible({
        sourceNode,
        targetNode,
        width,
        height,
        transform: [viewport.x, viewport.y, viewport.zoom]
      });
    }) : edges;
    return visibleEdges2;
  });
  return derived([visibleEdges, store.nodes, store.nodeLookup, store.connectionMode, store.onerror], ([visibleEdges2, , nodeLookup, connectionMode, onerror]) => {
    const layoutedEdges = visibleEdges2.reduce((res, edge) => {
      const sourceNode = nodeLookup.get(edge.source);
      const targetNode = nodeLookup.get(edge.target);
      if (!sourceNode || !targetNode) {
        return res;
      }
      const edgePosition = getEdgePosition({
        id: edge.id,
        sourceNode,
        targetNode,
        sourceHandle: edge.sourceHandle || null,
        targetHandle: edge.targetHandle || null,
        connectionMode,
        onError: onerror
      });
      if (edgePosition) {
        res.push({
          ...edge,
          zIndex: getElevatedEdgeZIndex({
            selected: edge.selected,
            zIndex: edge.zIndex,
            sourceNode,
            targetNode,
            elevateOnSelect: false
          }),
          ...edgePosition
        });
      }
      return res;
    }, []);
    return layoutedEdges;
  });
}
function getVisibleNodes(store) {
  return derived([
    store.nodeLookup,
    store.onlyRenderVisibleElements,
    store.width,
    store.height,
    store.viewport,
    store.nodes
  ], ([nodeLookup, onlyRenderVisibleElements, width, height, viewport]) => {
    const transform = [viewport.x, viewport.y, viewport.zoom];
    return onlyRenderVisibleElements ? getNodesInside(nodeLookup, { x: 0, y: 0, width, height }, transform, true) : Array.from(nodeLookup.values());
  });
}
const key = Symbol();
function createStore({ nodes, edges, width, height, fitView: fitViewOnCreate, nodeOrigin, nodeExtent }) {
  const store = getInitialStore({
    nodes,
    edges,
    width,
    height,
    fitView: fitViewOnCreate,
    nodeOrigin,
    nodeExtent
  });
  function setNodeTypes(nodeTypes2) {
    store.nodeTypes.set({
      ...initialNodeTypes,
      ...nodeTypes2
    });
  }
  function setEdgeTypes(edgeTypes) {
    store.edgeTypes.set({
      ...initialEdgeTypes,
      ...edgeTypes
    });
  }
  function addEdge$1(edgeParams) {
    const edges2 = get$1(store.edges);
    store.edges.set(addEdge(edgeParams, edges2));
  }
  const updateNodePositions = (nodeDragItems, dragging = false) => {
    const nodeLookup = get$1(store.nodeLookup);
    for (const [id, dragItem] of nodeDragItems) {
      const node = nodeLookup.get(id)?.internals.userNode;
      if (!node) {
        continue;
      }
      node.position = dragItem.position;
      node.dragging = dragging;
    }
    store.nodes.update((nds) => nds);
  };
  function updateNodeInternals$1(updates) {
    const nodeLookup = get$1(store.nodeLookup);
    const parentLookup = get$1(store.parentLookup);
    const { changes, updatedInternals } = updateNodeInternals(updates, nodeLookup, get$1(store.parentLookup), get$1(store.domNode), get$1(store.nodeOrigin));
    if (!updatedInternals) {
      return;
    }
    updateAbsolutePositions(nodeLookup, parentLookup, { nodeOrigin, nodeExtent });
    if (!get$1(store.fitViewOnInitDone) && get$1(store.fitViewOnInit)) {
      const fitViewOptions = get$1(store.fitViewOptions);
      const fitViewOnInitDone = fitViewSync({
        ...fitViewOptions,
        nodes: fitViewOptions?.nodes
      });
      store.fitViewOnInitDone.set(fitViewOnInitDone);
    }
    for (const change of changes) {
      const node = nodeLookup.get(change.id)?.internals.userNode;
      if (!node) {
        continue;
      }
      switch (change.type) {
        case "dimensions": {
          const measured = { ...node.measured, ...change.dimensions };
          if (change.setAttributes) {
            node.width = change.dimensions?.width ?? node.width;
            node.height = change.dimensions?.height ?? node.height;
          }
          node.measured = measured;
          break;
        }
        case "position":
          node.position = change.position ?? node.position;
          break;
      }
    }
    store.nodes.update((nds) => nds);
    if (!get$1(store.nodesInitialized)) {
      store.nodesInitialized.set(true);
    }
  }
  function fitView$1(options) {
    const panZoom = get$1(store.panZoom);
    const domNode = get$1(store.domNode);
    if (!panZoom || !domNode) {
      return Promise.resolve(false);
    }
    const { width: width2, height: height2 } = getDimensions(domNode);
    const fitViewNodes = getFitViewNodes(get$1(store.nodeLookup), options);
    return fitView({
      nodes: fitViewNodes,
      width: width2,
      height: height2,
      minZoom: get$1(store.minZoom),
      maxZoom: get$1(store.maxZoom),
      panZoom
    }, options);
  }
  function fitViewSync(options) {
    const panZoom = get$1(store.panZoom);
    if (!panZoom) {
      return false;
    }
    const fitViewNodes = getFitViewNodes(get$1(store.nodeLookup), options);
    fitView({
      nodes: fitViewNodes,
      width: get$1(store.width),
      height: get$1(store.height),
      minZoom: get$1(store.minZoom),
      maxZoom: get$1(store.maxZoom),
      panZoom
    }, options);
    return fitViewNodes.size > 0;
  }
  function zoomBy(factor, options) {
    const panZoom = get$1(store.panZoom);
    if (!panZoom) {
      return Promise.resolve(false);
    }
    return panZoom.scaleBy(factor, options);
  }
  function zoomIn(options) {
    return zoomBy(1.2, options);
  }
  function zoomOut(options) {
    return zoomBy(1 / 1.2, options);
  }
  function setMinZoom(minZoom) {
    const panZoom = get$1(store.panZoom);
    if (panZoom) {
      panZoom.setScaleExtent([minZoom, get$1(store.maxZoom)]);
      store.minZoom.set(minZoom);
    }
  }
  function setMaxZoom(maxZoom) {
    const panZoom = get$1(store.panZoom);
    if (panZoom) {
      panZoom.setScaleExtent([get$1(store.minZoom), maxZoom]);
      store.maxZoom.set(maxZoom);
    }
  }
  function setTranslateExtent(extent) {
    const panZoom = get$1(store.panZoom);
    if (panZoom) {
      panZoom.setTranslateExtent(extent);
      store.translateExtent.set(extent);
    }
  }
  function resetSelectedElements(elements) {
    let elementsChanged = false;
    elements.forEach((element2) => {
      if (element2.selected) {
        element2.selected = false;
        elementsChanged = true;
      }
    });
    return elementsChanged;
  }
  function setPaneClickDistance(distance) {
    get$1(store.panZoom)?.setClickDistance(distance);
  }
  function unselectNodesAndEdges(params) {
    const resetNodes = resetSelectedElements(params?.nodes || get$1(store.nodes));
    if (resetNodes)
      store.nodes.set(get$1(store.nodes));
    const resetEdges = resetSelectedElements(params?.edges || get$1(store.edges));
    if (resetEdges)
      store.edges.set(get$1(store.edges));
  }
  store.deleteKeyPressed.subscribe(async (deleteKeyPressed) => {
    if (deleteKeyPressed) {
      const nodes2 = get$1(store.nodes);
      const edges2 = get$1(store.edges);
      const selectedNodes = nodes2.filter((node) => node.selected);
      const selectedEdges = edges2.filter((edge) => edge.selected);
      const { nodes: matchingNodes, edges: matchingEdges } = await getElementsToRemove({
        nodesToRemove: selectedNodes,
        edgesToRemove: selectedEdges,
        nodes: nodes2,
        edges: edges2,
        onBeforeDelete: get$1(store.onbeforedelete)
      });
      if (matchingNodes.length || matchingEdges.length) {
        store.nodes.update((nds) => nds.filter((node) => !matchingNodes.some((mN) => mN.id === node.id)));
        store.edges.update((eds) => eds.filter((edge) => !matchingEdges.some((mE) => mE.id === edge.id)));
        get$1(store.ondelete)?.({
          nodes: matchingNodes,
          edges: matchingEdges
        });
      }
    }
  });
  function addSelectedNodes(ids) {
    const isMultiSelection = get$1(store.multiselectionKeyPressed);
    store.nodes.update((ns) => ns.map((node) => {
      const nodeWillBeSelected = ids.includes(node.id);
      const selected = isMultiSelection ? node.selected || nodeWillBeSelected : nodeWillBeSelected;
      node.selected = selected;
      return node;
    }));
    if (!isMultiSelection) {
      store.edges.update((es) => es.map((edge) => {
        edge.selected = false;
        return edge;
      }));
    }
  }
  function addSelectedEdges(ids) {
    const isMultiSelection = get$1(store.multiselectionKeyPressed);
    store.edges.update((edges2) => edges2.map((edge) => {
      const edgeWillBeSelected = ids.includes(edge.id);
      const selected = isMultiSelection ? edge.selected || edgeWillBeSelected : edgeWillBeSelected;
      edge.selected = selected;
      return edge;
    }));
    if (!isMultiSelection) {
      store.nodes.update((ns) => ns.map((node) => {
        node.selected = false;
        return node;
      }));
    }
  }
  function handleNodeSelection(id) {
    const node = get$1(store.nodes)?.find((n) => n.id === id);
    if (!node) {
      console.warn("012", errorMessages["error012"](id));
      return;
    }
    store.selectionRect.set(null);
    store.selectionRectMode.set(null);
    if (!node.selected) {
      addSelectedNodes([id]);
    } else if (node.selected && get$1(store.multiselectionKeyPressed)) {
      unselectNodesAndEdges({ nodes: [node], edges: [] });
    }
  }
  function panBy$1(delta) {
    const viewport = get$1(store.viewport);
    return panBy({
      delta,
      panZoom: get$1(store.panZoom),
      transform: [viewport.x, viewport.y, viewport.zoom],
      translateExtent: get$1(store.translateExtent),
      width: get$1(store.width),
      height: get$1(store.height)
    });
  }
  const _connection = writable(initialConnection);
  const updateConnection = (newConnection) => {
    _connection.set({ ...newConnection });
  };
  function cancelConnection() {
    _connection.set(initialConnection);
  }
  function reset() {
    store.fitViewOnInitDone.set(false);
    store.selectionRect.set(null);
    store.selectionRectMode.set(null);
    store.snapGrid.set(null);
    store.isValidConnection.set(() => true);
    unselectNodesAndEdges();
    cancelConnection();
  }
  return {
    // state
    ...store,
    // derived state
    visibleEdges: getVisibleEdges(store),
    visibleNodes: getVisibleNodes(store),
    connection: derived([_connection, store.viewport], ([connection, viewport]) => {
      return connection.inProgress ? {
        ...connection,
        to: pointToRendererPoint(connection.to, [viewport.x, viewport.y, viewport.zoom])
      } : { ...connection };
    }),
    markers: derived([store.edges, store.defaultMarkerColor, store.flowId], ([edges2, defaultColor, id]) => createMarkerIds(edges2, { defaultColor, id })),
    initialized: (() => {
      let initialized = false;
      const initialNodesLength = get$1(store.nodes).length;
      const initialEdgesLength = get$1(store.edges).length;
      return derived([store.nodesInitialized, store.edgesInitialized, store.viewportInitialized], ([nodesInitialized, edgesInitialized, viewportInitialized]) => {
        if (initialized)
          return initialized;
        if (initialNodesLength === 0) {
          initialized = viewportInitialized;
        } else if (initialEdgesLength === 0) {
          initialized = viewportInitialized && nodesInitialized;
        } else {
          initialized = viewportInitialized && nodesInitialized && edgesInitialized;
        }
        return initialized;
      });
    })(),
    // actions
    syncNodeStores: (nodes2) => syncNodeStores(store.nodes, nodes2),
    syncEdgeStores: (edges2) => syncEdgeStores(store.edges, edges2),
    syncViewport: (viewport) => syncViewportStores(store.panZoom, store.viewport, viewport),
    setNodeTypes,
    setEdgeTypes,
    addEdge: addEdge$1,
    updateNodePositions,
    updateNodeInternals: updateNodeInternals$1,
    zoomIn,
    zoomOut,
    fitView: (options) => fitView$1(options),
    setMinZoom,
    setMaxZoom,
    setTranslateExtent,
    setPaneClickDistance,
    unselectNodesAndEdges,
    addSelectedNodes,
    addSelectedEdges,
    handleNodeSelection,
    panBy: panBy$1,
    updateConnection,
    cancelConnection,
    reset
  };
}
function useStore() {
  const store = getContext$1(key);
  if (!store) {
    throw new Error("In order to use useStore you need to wrap your component in a <SvelteFlowProvider />");
  }
  return store.getStore();
}
function createStoreContext({ nodes, edges, width, height, fitView: fitView2, nodeOrigin, nodeExtent }) {
  const store = createStore({ nodes, edges, width, height, fitView: fitView2, nodeOrigin, nodeExtent });
  setContext$1(key, {
    getStore: () => store
  });
  return store;
}
function Zoom($$payload, $$props) {
  push();
  var $$store_subs;
  let initialViewport = fallback($$props["initialViewport"], void 0);
  let onMoveStart = fallback($$props["onMoveStart"], void 0);
  let onMove = fallback($$props["onMove"], void 0);
  let onMoveEnd = fallback($$props["onMoveEnd"], void 0);
  let panOnScrollMode = $$props["panOnScrollMode"];
  let preventScrolling = $$props["preventScrolling"];
  let zoomOnScroll = $$props["zoomOnScroll"];
  let zoomOnDoubleClick = $$props["zoomOnDoubleClick"];
  let zoomOnPinch = $$props["zoomOnPinch"];
  let panOnDrag = $$props["panOnDrag"];
  let panOnScroll = $$props["panOnScroll"];
  let paneClickDistance = $$props["paneClickDistance"];
  const {
    viewport,
    panZoom,
    selectionRect,
    minZoom,
    maxZoom,
    dragging,
    translateExtent,
    lib,
    panActivationKeyPressed,
    zoomActivationKeyPressed,
    viewportInitialized
  } = useStore();
  store_get($$store_subs ??= {}, "$panActivationKeyPressed", panActivationKeyPressed) || panOnDrag;
  store_get($$store_subs ??= {}, "$panActivationKeyPressed", panActivationKeyPressed) || panOnScroll;
  $$payload.out += `<div class="svelte-flow__zoom svelte-4xkw84"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    initialViewport,
    onMoveStart,
    onMove,
    onMoveEnd,
    panOnScrollMode,
    preventScrolling,
    zoomOnScroll,
    zoomOnDoubleClick,
    zoomOnPinch,
    panOnDrag,
    panOnScroll,
    paneClickDistance
  });
  pop();
}
function Pane($$payload, $$props) {
  push();
  var $$store_subs;
  let _panOnDrag, isSelecting;
  let panOnDrag = fallback($$props["panOnDrag"], void 0);
  let selectionOnDrag = fallback($$props["selectionOnDrag"], void 0);
  const {
    nodes,
    nodeLookup,
    edges,
    viewport,
    dragging,
    elementsSelectable,
    selectionRect,
    selectionRectMode,
    selectionKeyPressed,
    selectionMode,
    panActivationKeyPressed,
    unselectNodesAndEdges
  } = useStore();
  _panOnDrag = store_get($$store_subs ??= {}, "$panActivationKeyPressed", panActivationKeyPressed) || panOnDrag;
  isSelecting = store_get($$store_subs ??= {}, "$selectionKeyPressed", selectionKeyPressed) || store_get($$store_subs ??= {}, "$selectionRect", selectionRect) || selectionOnDrag && _panOnDrag !== true;
  store_get($$store_subs ??= {}, "$elementsSelectable", elementsSelectable) && (isSelecting || store_get($$store_subs ??= {}, "$selectionRectMode", selectionRectMode) === "user");
  $$payload.out += `<div${attr("class", `svelte-flow__pane svelte-1esy7hx ${stringify([
    panOnDrag === true || Array.isArray(panOnDrag) && panOnDrag.includes(0) ? "draggable" : "",
    store_get($$store_subs ??= {}, "$dragging", dragging) ? "dragging" : "",
    isSelecting ? "selection" : ""
  ].filter(Boolean).join(" "))}`)}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { panOnDrag, selectionOnDrag });
  pop();
}
function Viewport($$payload, $$props) {
  push();
  var $$store_subs;
  const { viewport } = useStore();
  $$payload.out += `<div class="svelte-flow__viewport xyflow__viewport svelte-1floaup"${attr("style", `transform: translate(${stringify(store_get($$store_subs ??= {}, "$viewport", viewport).x)}px, ${stringify(store_get($$store_subs ??= {}, "$viewport", viewport).y)}px) scale(${stringify(store_get($$store_subs ??= {}, "$viewport", viewport).zoom)})`)}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function getNodeInlineStyleDimensions({ width, height, initialWidth, initialHeight, measuredWidth, measuredHeight }) {
  if (measuredWidth === void 0 && measuredHeight === void 0) {
    const styleWidth = width ?? initialWidth;
    const styleHeight = height ?? initialHeight;
    return {
      width: styleWidth ? `width:${styleWidth}px;` : "",
      height: styleHeight ? `height:${styleHeight}px;` : ""
    };
  }
  return {
    width: width ? `width:${width}px;` : "",
    height: height ? `height:${height}px;` : ""
  };
}
function NodeWrapper($$payload, $$props) {
  push();
  var $$store_subs;
  let nodeType, nodeTypeValid, nodeComponent, inlineStyleDimensions;
  let node = $$props["node"];
  let id = $$props["id"];
  let data = fallback($$props["data"], () => ({}), true);
  let selected = fallback($$props["selected"], false);
  let draggable = fallback($$props["draggable"], void 0);
  let selectable = fallback($$props["selectable"], void 0);
  let connectable = fallback($$props["connectable"], true);
  let deletable = fallback($$props["deletable"], true);
  let hidden = fallback($$props["hidden"], false);
  let dragging = fallback($$props["dragging"], false);
  let resizeObserver = fallback($$props["resizeObserver"], null);
  let style = fallback($$props["style"], void 0);
  let type = fallback($$props["type"], "default");
  let isParent = fallback($$props["isParent"], false);
  let positionX = $$props["positionX"];
  let positionY = $$props["positionY"];
  let sourcePosition = fallback($$props["sourcePosition"], void 0);
  let targetPosition = fallback($$props["targetPosition"], void 0);
  let zIndex = $$props["zIndex"];
  let measuredWidth = fallback($$props["measuredWidth"], void 0);
  let measuredHeight = fallback($$props["measuredHeight"], void 0);
  let initialWidth = fallback($$props["initialWidth"], void 0);
  let initialHeight = fallback($$props["initialHeight"], void 0);
  let width = fallback($$props["width"], void 0);
  let height = fallback($$props["height"], void 0);
  let dragHandle = fallback($$props["dragHandle"], void 0);
  let initialized = fallback($$props["initialized"], false);
  let parentId = fallback($$props["parentId"], void 0);
  let nodeClickDistance = fallback($$props["nodeClickDistance"], void 0);
  let className = fallback($$props["class"], "");
  const store = useStore();
  const {
    nodeTypes: nodeTypes2,
    nodeDragThreshold,
    selectNodesOnDrag,
    handleNodeSelection,
    updateNodeInternals: updateNodeInternals2
  } = store;
  let nodeRef;
  let prevNodeRef = null;
  const connectableStore = writable(connectable);
  let prevType = void 0;
  let prevSourcePosition = void 0;
  let prevTargetPosition = void 0;
  setContext$1("svelteflow__node_id", id);
  setContext$1("svelteflow__node_connectable", connectableStore);
  onDestroy(() => {
    if (prevNodeRef) {
      resizeObserver?.unobserve(prevNodeRef);
    }
  });
  nodeType = type || "default";
  nodeTypeValid = !!store_get($$store_subs ??= {}, "$nodeTypes", nodeTypes2)[nodeType];
  nodeComponent = store_get($$store_subs ??= {}, "$nodeTypes", nodeTypes2)[nodeType] || DefaultNode;
  {
    if (!nodeTypeValid) {
      console.warn("003", errorMessages["error003"](type));
    }
  }
  inlineStyleDimensions = getNodeInlineStyleDimensions({
    width,
    height,
    initialWidth,
    initialHeight,
    measuredWidth,
    measuredHeight
  });
  {
    connectableStore.set(!!connectable);
  }
  {
    const doUpdate = prevType && nodeType !== prevType || prevSourcePosition && sourcePosition !== prevSourcePosition || prevTargetPosition && targetPosition !== prevTargetPosition;
    if (doUpdate) {
      requestAnimationFrame(() => updateNodeInternals2(/* @__PURE__ */ new Map([
        [
          id,
          { id, nodeElement: nodeRef, force: true }
        ]
      ])));
    }
    prevType = nodeType;
    prevSourcePosition = sourcePosition;
    prevTargetPosition = targetPosition;
  }
  {
    if (resizeObserver && (nodeRef !== prevNodeRef || !initialized)) {
      prevNodeRef && resizeObserver.unobserve(prevNodeRef);
      prevNodeRef = nodeRef;
    }
  }
  if (!hidden) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${add_styles(merge_styles(`${stringify(style ?? "")};${stringify(inlineStyleDimensions.width)}${stringify(inlineStyleDimensions.height)}`, {
      "z-index": zIndex,
      transform: `translate(${stringify(positionX)}px, ${stringify(positionY)}px)`,
      visibility: initialized ? "visible" : "hidden"
    }))}${attr("data-id", id)}${attr("class", `${stringify(cc([
      "svelte-flow__node",
      `svelte-flow__node-${nodeType}`,
      className
    ]))} ${stringify([
      dragging ? "dragging" : "",
      selected ? "selected" : "",
      draggable ? "draggable" : "",
      connectable ? "connectable" : "",
      selectable ? "selectable" : "",
      draggable ? "nopan" : "",
      isParent ? "parent" : ""
    ].filter(Boolean).join(" "))}`)}><!---->`;
    nodeComponent?.($$payload, {
      data,
      id,
      selected,
      selectable,
      deletable,
      sourcePosition,
      targetPosition,
      zIndex,
      dragging,
      draggable,
      dragHandle,
      parentId,
      type: nodeType,
      isConnectable: store_get($$store_subs ??= {}, "$connectableStore", connectableStore),
      positionAbsoluteX: positionX,
      positionAbsoluteY: positionY,
      width,
      height
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    node,
    id,
    data,
    selected,
    draggable,
    selectable,
    connectable,
    deletable,
    hidden,
    dragging,
    resizeObserver,
    style,
    type,
    isParent,
    positionX,
    positionY,
    sourcePosition,
    targetPosition,
    zIndex,
    measuredWidth,
    measuredHeight,
    initialWidth,
    initialHeight,
    width,
    height,
    dragHandle,
    initialized,
    parentId,
    nodeClickDistance,
    class: className
  });
  pop();
}
function NodeRenderer($$payload, $$props) {
  push();
  var $$store_subs;
  let nodeClickDistance = fallback($$props["nodeClickDistance"], 0);
  const {
    visibleNodes,
    nodesDraggable,
    nodesConnectable,
    elementsSelectable,
    updateNodeInternals: updateNodeInternals2,
    parentLookup
  } = useStore();
  const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver((entries) => {
    const updates = /* @__PURE__ */ new Map();
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("data-id");
      updates.set(id, { id, nodeElement: entry.target, force: true });
    });
    updateNodeInternals2(updates);
  });
  onDestroy(() => {
    resizeObserver?.disconnect();
  });
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$visibleNodes", visibleNodes));
  $$payload.out += `<div class="svelte-flow__nodes svelte-tf4uy4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let node = each_array[$$index];
    NodeWrapper($$payload, {
      node,
      id: node.id,
      data: node.data,
      selected: !!node.selected,
      hidden: !!node.hidden,
      draggable: !!(node.draggable || store_get($$store_subs ??= {}, "$nodesDraggable", nodesDraggable) && typeof node.draggable === "undefined"),
      selectable: !!(node.selectable || store_get($$store_subs ??= {}, "$elementsSelectable", elementsSelectable) && typeof node.selectable === "undefined"),
      connectable: !!(node.connectable || store_get($$store_subs ??= {}, "$nodesConnectable", nodesConnectable) && typeof node.connectable === "undefined"),
      deletable: node.deletable ?? true,
      positionX: node.internals.positionAbsolute.x,
      positionY: node.internals.positionAbsolute.y,
      isParent: store_get($$store_subs ??= {}, "$parentLookup", parentLookup).has(node.id),
      style: node.style,
      class: node.class,
      type: node.type ?? "default",
      sourcePosition: node.sourcePosition,
      targetPosition: node.targetPosition,
      dragging: node.dragging,
      zIndex: node.internals.z ?? 0,
      dragHandle: node.dragHandle,
      initialized: nodeHasDimensions(node),
      width: node.width,
      height: node.height,
      initialWidth: node.initialWidth,
      initialHeight: node.initialHeight,
      measuredWidth: node.measured.width,
      measuredHeight: node.measured.height,
      parentId: node.parentId,
      resizeObserver,
      nodeClickDistance
    });
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { nodeClickDistance });
  pop();
}
function EdgeWrapper($$payload, $$props) {
  push();
  var $$store_subs;
  let edgeType, edgeComponent, markerStartUrl, markerEndUrl, isSelectable;
  let id = $$props["id"];
  let type = fallback($$props["type"], "default");
  let source = fallback($$props["source"], "");
  let target = fallback($$props["target"], "");
  let data = fallback($$props["data"], () => ({}), true);
  let style = fallback($$props["style"], void 0);
  let zIndex = fallback($$props["zIndex"], void 0);
  let animated = fallback($$props["animated"], false);
  let selected = fallback($$props["selected"], false);
  let selectable = fallback($$props["selectable"], void 0);
  let deletable = fallback($$props["deletable"], void 0);
  let hidden = fallback($$props["hidden"], false);
  let label = fallback($$props["label"], void 0);
  let labelStyle = fallback($$props["labelStyle"], void 0);
  let markerStart = fallback($$props["markerStart"], void 0);
  let markerEnd = fallback($$props["markerEnd"], void 0);
  let sourceHandle = fallback($$props["sourceHandle"], void 0);
  let targetHandle = fallback($$props["targetHandle"], void 0);
  let sourceX = $$props["sourceX"];
  let sourceY = $$props["sourceY"];
  let targetX = $$props["targetX"];
  let targetY = $$props["targetY"];
  let sourcePosition = $$props["sourcePosition"];
  let targetPosition = $$props["targetPosition"];
  let ariaLabel = fallback($$props["ariaLabel"], void 0);
  let interactionWidth = fallback($$props["interactionWidth"], void 0);
  let className = fallback($$props["class"], "");
  setContext$1("svelteflow__edge_id", id);
  const {
    edgeLookup,
    edgeTypes,
    flowId,
    elementsSelectable
  } = useStore();
  useHandleEdgeSelect();
  edgeType = type || "default";
  edgeComponent = store_get($$store_subs ??= {}, "$edgeTypes", edgeTypes)[edgeType] || BezierEdgeInternal;
  markerStartUrl = markerStart ? `url('#${getMarkerId(markerStart, store_get($$store_subs ??= {}, "$flowId", flowId))}')` : void 0;
  markerEndUrl = markerEnd ? `url('#${getMarkerId(markerEnd, store_get($$store_subs ??= {}, "$flowId", flowId))}')` : void 0;
  isSelectable = selectable ?? store_get($$store_subs ??= {}, "$elementsSelectable", elementsSelectable);
  if (!hidden) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg${add_styles({ "z-index": zIndex })}><g${attr("class", `${stringify(cc(["svelte-flow__edge", className]))} ${stringify([
      animated ? "animated" : "",
      selected ? "selected" : "",
      isSelectable ? "selectable" : ""
    ].filter(Boolean).join(" "))}`)}${attr("data-id", id)}${attr("aria-label", ariaLabel === null ? void 0 : ariaLabel ? ariaLabel : `Edge from ${source} to ${target}`)} role="img"><!---->`;
    edgeComponent?.($$payload, {
      id,
      source,
      target,
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
      animated,
      selected,
      label,
      labelStyle,
      data,
      style,
      interactionWidth,
      selectable: isSelectable,
      deletable: deletable ?? true,
      type: edgeType,
      sourceHandleId: sourceHandle,
      targetHandleId: targetHandle,
      markerStart: markerStartUrl,
      markerEnd: markerEndUrl
    });
    $$payload.out += `<!----></g></svg>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    id,
    type,
    source,
    target,
    data,
    style,
    zIndex,
    animated,
    selected,
    selectable,
    deletable,
    hidden,
    label,
    labelStyle,
    markerStart,
    markerEnd,
    sourceHandle,
    targetHandle,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    ariaLabel,
    interactionWidth,
    class: className
  });
  pop();
}
function CallOnMount($$payload, $$props) {
  push();
  let _onMount = fallback($$props["onMount"], void 0);
  let _onDestroy = fallback($$props["onDestroy"], void 0);
  bind_props($$props, { onMount: _onMount, onDestroy: _onDestroy });
  pop();
}
function MarkerDefinition($$payload, $$props) {
  push();
  var $$store_subs;
  const { markers } = useStore();
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$markers", markers));
  $$payload.out += `<defs><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let marker = each_array[$$index];
    Marker($$payload, spread_props([marker]));
  }
  $$payload.out += `<!--]--></defs>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Marker($$payload, $$props) {
  push();
  let id = $$props["id"];
  let type = $$props["type"];
  let width = fallback($$props["width"], 12.5);
  let height = fallback($$props["height"], 12.5);
  let markerUnits = fallback($$props["markerUnits"], "strokeWidth");
  let orient = fallback($$props["orient"], "auto-start-reverse");
  let color = fallback($$props["color"], void 0);
  let strokeWidth = fallback($$props["strokeWidth"], void 0);
  $$payload.out += `<marker class="svelte-flow__arrowhead"${attr("id", id)}${attr("markerWidth", `${width}`)}${attr("markerHeight", `${height}`)} viewBox="-10 -10 20 20"${attr("markerUnits", markerUnits)}${attr("orient", orient)} refX="0" refY="0">`;
  if (type === MarkerType.Arrow) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<polyline${attr("stroke", color)} stroke-linecap="round" stroke-linejoin="round"${attr("stroke-width", strokeWidth)} fill="none" points="-5,-4 0,0 -5,4"></polyline>`;
  } else {
    $$payload.out += "<!--[!-->";
    if (type === MarkerType.ArrowClosed) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<polyline${attr("stroke", color)} stroke-linecap="round" stroke-linejoin="round"${attr("stroke-width", strokeWidth)}${attr("fill", color)} points="-5,-4 0,0 -5,4 -5,-4"></polyline>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></marker>`;
  bind_props($$props, {
    id,
    type,
    width,
    height,
    markerUnits,
    orient,
    color,
    strokeWidth
  });
  pop();
}
function EdgeRenderer($$payload, $$props) {
  push();
  var $$store_subs;
  let defaultEdgeOptions2 = $$props["defaultEdgeOptions"];
  const {
    visibleEdges,
    edgesInitialized,
    edges: { setDefaultOptions },
    elementsSelectable
  } = useStore();
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$visibleEdges", visibleEdges));
  $$payload.out += `<div class="svelte-flow__edges"><svg class="svelte-flow__marker">`;
  MarkerDefinition($$payload);
  $$payload.out += `<!----></svg> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let edge = each_array[$$index];
    EdgeWrapper($$payload, {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      data: edge.data,
      style: edge.style,
      animated: edge.animated,
      selected: edge.selected,
      selectable: edge.selectable ?? store_get($$store_subs ??= {}, "$elementsSelectable", elementsSelectable),
      deletable: edge.deletable,
      hidden: edge.hidden,
      label: edge.label,
      labelStyle: edge.labelStyle,
      markerStart: edge.markerStart,
      markerEnd: edge.markerEnd,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
      sourceX: edge.sourceX,
      sourceY: edge.sourceY,
      targetX: edge.targetX,
      targetY: edge.targetY,
      sourcePosition: edge.sourcePosition,
      targetPosition: edge.targetPosition,
      ariaLabel: edge.ariaLabel,
      interactionWidth: edge.interactionWidth,
      class: edge.class,
      type: edge.type || "default",
      zIndex: edge.zIndex
    });
  }
  $$payload.out += `<!--]--> `;
  if (store_get($$store_subs ??= {}, "$visibleEdges", visibleEdges).length > 0) {
    $$payload.out += "<!--[-->";
    CallOnMount($$payload, {
      onMount: () => {
        store_set(edgesInitialized, true);
      },
      onDestroy: () => {
        store_set(edgesInitialized, false);
      }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { defaultEdgeOptions: defaultEdgeOptions2 });
  pop();
}
function Selection($$payload, $$props) {
  let x = fallback($$props["x"], 0);
  let y = fallback($$props["y"], 0);
  let width = fallback($$props["width"], 0);
  let height = fallback($$props["height"], 0);
  let isVisible = fallback($$props["isVisible"], true);
  if (isVisible) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${add_styles({
      width: typeof width === "string" ? width : `${width}px`,
      height: typeof height === "string" ? height : `${height}px`,
      transform: `translate(${x}px, ${y}px)`
    })} class="svelte-flow__selection svelte-1iugwpu"></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { x, y, width, height, isVisible });
}
function UserSelection($$payload, $$props) {
  push();
  var $$store_subs;
  const { selectionRect, selectionRectMode } = useStore();
  Selection($$payload, {
    isVisible: !!(store_get($$store_subs ??= {}, "$selectionRect", selectionRect) && store_get($$store_subs ??= {}, "$selectionRectMode", selectionRectMode) === "user"),
    width: store_get($$store_subs ??= {}, "$selectionRect", selectionRect)?.width,
    height: store_get($$store_subs ??= {}, "$selectionRect", selectionRect)?.height,
    x: store_get($$store_subs ??= {}, "$selectionRect", selectionRect)?.x,
    y: store_get($$store_subs ??= {}, "$selectionRect", selectionRect)?.y
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function NodeSelection($$payload, $$props) {
  push();
  var $$store_subs;
  const store = useStore();
  const { selectionRectMode, nodes, nodeLookup } = store;
  let bounds = null;
  if (store_get($$store_subs ??= {}, "$selectionRectMode", selectionRectMode) === "nodes") {
    bounds = getInternalNodesBounds(store_get($$store_subs ??= {}, "$nodeLookup", nodeLookup), { filter: (node) => !!node.selected });
    store_get($$store_subs ??= {}, "$nodes", nodes);
  }
  if (store_get($$store_subs ??= {}, "$selectionRectMode", selectionRectMode) === "nodes" && bounds && isNumeric(bounds.x) && isNumeric(bounds.y)) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="selection-wrapper nopan svelte-5pxri"${attr("style", `width: ${stringify(bounds.width)}px; height: ${stringify(bounds.height)}px; transform: translate(${stringify(bounds.x)}px, ${stringify(bounds.y)}px)`)} role="button" tabindex="-1">`;
    Selection($$payload, { width: "100%", height: "100%", x: 0, y: 0 });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function KeyHandler($$payload, $$props) {
  push();
  let selectionKey = fallback($$props["selectionKey"], "Shift");
  let multiSelectionKey = fallback($$props["multiSelectionKey"], () => isMacOs() ? "Meta" : "Control", true);
  let deleteKey = fallback($$props["deleteKey"], "Backspace");
  let panActivationKey = fallback($$props["panActivationKey"], " ");
  let zoomActivationKey = fallback($$props["zoomActivationKey"], () => isMacOs() ? "Meta" : "Control", true);
  useStore();
  bind_props($$props, {
    selectionKey,
    multiSelectionKey,
    deleteKey,
    panActivationKey,
    zoomActivationKey
  });
  pop();
}
function ConnectionLine($$payload, $$props) {
  push();
  var $$store_subs;
  let containerStyle = fallback($$props["containerStyle"], "");
  let style = fallback($$props["style"], "");
  let isCustomComponent = fallback($$props["isCustomComponent"], false);
  const {
    width,
    height,
    connection,
    connectionLineType
  } = useStore();
  let path = null;
  if (store_get($$store_subs ??= {}, "$connection", connection).inProgress && !isCustomComponent) {
    const { from, to, fromPosition, toPosition } = store_get($$store_subs ??= {}, "$connection", connection);
    const pathParams = {
      sourceX: from.x,
      sourceY: from.y,
      sourcePosition: fromPosition,
      targetX: to.x,
      targetY: to.y,
      targetPosition: toPosition
    };
    switch (store_get($$store_subs ??= {}, "$connectionLineType", connectionLineType)) {
      case ConnectionLineType.Bezier:
        [path] = getBezierPath(pathParams);
        break;
      case ConnectionLineType.Step:
        [path] = getSmoothStepPath({ ...pathParams, borderRadius: 0 });
        break;
      case ConnectionLineType.SmoothStep:
        [path] = getSmoothStepPath(pathParams);
        break;
      default:
        [path] = getStraightPath(pathParams);
    }
  }
  if (store_get($$store_subs ??= {}, "$connection", connection).inProgress) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg${attr("width", store_get($$store_subs ??= {}, "$width", width))}${attr("height", store_get($$store_subs ??= {}, "$height", height))} class="svelte-flow__connectionline"${attr("style", containerStyle)}><g${attr("class", cc([
      "svelte-flow__connection",
      getConnectionStatus(store_get($$store_subs ??= {}, "$connection", connection).isValid)
    ]))}><!---->`;
    slot($$payload, $$props, "connectionLine", {});
    $$payload.out += `<!---->`;
    if (!isCustomComponent) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<path${attr("d", path)}${attr("style", style)} fill="none" class="svelte-flow__connection-path"></path>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></g></svg>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { containerStyle, style, isCustomComponent });
  pop();
}
function Panel($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["position", "style", "class"]);
  push();
  var $$store_subs;
  let positionClasses;
  let position = fallback($$props["position"], "top-right");
  let style = fallback($$props["style"], void 0);
  let className = fallback($$props["class"], void 0);
  const { selectionRectMode } = useStore();
  positionClasses = `${position}`.split("-");
  $$payload.out += `<div${spread_attributes(
    {
      class: cc([
        "svelte-flow__panel",
        className,
        ...positionClasses
      ]),
      style,
      ...$$restProps
    },
    void 0,
    {
      "pointer-events": store_get($$store_subs ??= {}, "$selectionRectMode", selectionRectMode) ? "none" : ""
    }
  )}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { position, style, class: className });
  pop();
}
function Attribution($$payload, $$props) {
  push();
  let proOptions = fallback($$props["proOptions"], void 0);
  let position = fallback($$props["position"], "bottom-right");
  if (!proOptions?.hideAttribution) {
    $$payload.out += "<!--[-->";
    Panel($$payload, {
      position,
      class: "svelte-flow__attribution",
      "data-message": "Feel free to remove the attribution or check out how you could support us: https://svelteflow.dev/support-us",
      children: ($$payload2) => {
        $$payload2.out += `<a href="https://svelteflow.dev" target="_blank" rel="noopener noreferrer" aria-label="Svelte Flow attribution">Svelte Flow</a>`;
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { proOptions, position });
  pop();
}
function updateStore(store, { nodeTypes: nodeTypes2, edgeTypes, minZoom, maxZoom, translateExtent, paneClickDistance }) {
  if (nodeTypes2 !== void 0) {
    store.setNodeTypes(nodeTypes2);
  }
  if (edgeTypes !== void 0) {
    store.setEdgeTypes(edgeTypes);
  }
  if (minZoom !== void 0) {
    store.setMinZoom(minZoom);
  }
  if (maxZoom !== void 0) {
    store.setMaxZoom(maxZoom);
  }
  if (translateExtent !== void 0) {
    store.setTranslateExtent(translateExtent);
  }
  if (paneClickDistance !== void 0) {
    store.setPaneClickDistance(paneClickDistance);
  }
}
const getKeys = (obj) => Object.keys(obj);
function updateStoreByKeys(store, keys) {
  getKeys(keys).forEach((prop) => {
    const update = keys[prop];
    if (update !== void 0) {
      store[prop].set(update);
    }
  });
}
function getMediaQuery() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return null;
  }
  return window.matchMedia("(prefers-color-scheme: dark)");
}
function useColorModeClass(colorMode = "light") {
  const colorModeClass = readable("light", (set) => {
    if (colorMode !== "system") {
      set(colorMode);
      return;
    }
    const mediaQuery = getMediaQuery();
    const updateColorModeClass = () => set(mediaQuery?.matches ? "dark" : "light");
    set(mediaQuery?.matches ? "dark" : "light");
    mediaQuery?.addEventListener("change", updateColorModeClass);
    return () => {
      mediaQuery?.removeEventListener("change", updateColorModeClass);
    };
  });
  return colorModeClass;
}
function SvelteFlow($$payload, $$props) {
  const $$slots = sanitize_slots($$props);
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "id",
    "nodes",
    "edges",
    "fitView",
    "fitViewOptions",
    "minZoom",
    "maxZoom",
    "initialViewport",
    "viewport",
    "nodeTypes",
    "edgeTypes",
    "selectionKey",
    "selectionMode",
    "panActivationKey",
    "multiSelectionKey",
    "zoomActivationKey",
    "nodesDraggable",
    "nodesConnectable",
    "nodeDragThreshold",
    "elementsSelectable",
    "snapGrid",
    "deleteKey",
    "connectionRadius",
    "connectionLineType",
    "connectionMode",
    "connectionLineStyle",
    "connectionLineContainerStyle",
    "onMoveStart",
    "onMove",
    "onMoveEnd",
    "isValidConnection",
    "translateExtent",
    "nodeExtent",
    "onlyRenderVisibleElements",
    "panOnScrollMode",
    "preventScrolling",
    "zoomOnScroll",
    "zoomOnDoubleClick",
    "zoomOnPinch",
    "panOnScroll",
    "panOnDrag",
    "selectionOnDrag",
    "autoPanOnConnect",
    "autoPanOnNodeDrag",
    "onerror",
    "ondelete",
    "onedgecreate",
    "attributionPosition",
    "proOptions",
    "defaultEdgeOptions",
    "width",
    "height",
    "colorMode",
    "onconnect",
    "onconnectstart",
    "onconnectend",
    "onbeforedelete",
    "oninit",
    "nodeOrigin",
    "paneClickDistance",
    "nodeClickDistance",
    "defaultMarkerColor",
    "style",
    "class"
  ]);
  push();
  var $$store_subs;
  let colorModeClass;
  let id = fallback($$props["id"], "1");
  let nodes = $$props["nodes"];
  let edges = $$props["edges"];
  let fitView2 = fallback($$props["fitView"], void 0);
  let fitViewOptions = fallback($$props["fitViewOptions"], void 0);
  let minZoom = fallback($$props["minZoom"], void 0);
  let maxZoom = fallback($$props["maxZoom"], void 0);
  let initialViewport = fallback($$props["initialViewport"], void 0);
  let viewport = fallback($$props["viewport"], void 0);
  let nodeTypes2 = fallback($$props["nodeTypes"], void 0);
  let edgeTypes = fallback($$props["edgeTypes"], void 0);
  let selectionKey = fallback($$props["selectionKey"], void 0);
  let selectionMode = fallback($$props["selectionMode"], void 0);
  let panActivationKey = fallback($$props["panActivationKey"], void 0);
  let multiSelectionKey = fallback($$props["multiSelectionKey"], void 0);
  let zoomActivationKey = fallback($$props["zoomActivationKey"], void 0);
  let nodesDraggable = fallback($$props["nodesDraggable"], void 0);
  let nodesConnectable = fallback($$props["nodesConnectable"], void 0);
  let nodeDragThreshold = fallback($$props["nodeDragThreshold"], void 0);
  let elementsSelectable = fallback($$props["elementsSelectable"], void 0);
  let snapGrid = fallback($$props["snapGrid"], void 0);
  let deleteKey = fallback($$props["deleteKey"], void 0);
  let connectionRadius = fallback($$props["connectionRadius"], void 0);
  let connectionLineType = fallback($$props["connectionLineType"], void 0);
  let connectionMode = fallback($$props["connectionMode"], () => ConnectionMode.Strict, true);
  let connectionLineStyle = fallback($$props["connectionLineStyle"], "");
  let connectionLineContainerStyle = fallback($$props["connectionLineContainerStyle"], "");
  let onMoveStart = fallback($$props["onMoveStart"], void 0);
  let onMove = fallback($$props["onMove"], void 0);
  let onMoveEnd = fallback($$props["onMoveEnd"], void 0);
  let isValidConnection = fallback($$props["isValidConnection"], void 0);
  let translateExtent = fallback($$props["translateExtent"], void 0);
  let nodeExtent = fallback($$props["nodeExtent"], void 0);
  let onlyRenderVisibleElements = fallback($$props["onlyRenderVisibleElements"], void 0);
  let panOnScrollMode = fallback($$props["panOnScrollMode"], () => PanOnScrollMode.Free, true);
  let preventScrolling = fallback($$props["preventScrolling"], true);
  let zoomOnScroll = fallback($$props["zoomOnScroll"], true);
  let zoomOnDoubleClick = fallback($$props["zoomOnDoubleClick"], true);
  let zoomOnPinch = fallback($$props["zoomOnPinch"], true);
  let panOnScroll = fallback($$props["panOnScroll"], false);
  let panOnDrag = fallback($$props["panOnDrag"], true);
  let selectionOnDrag = fallback($$props["selectionOnDrag"], void 0);
  let autoPanOnConnect = fallback($$props["autoPanOnConnect"], true);
  let autoPanOnNodeDrag = fallback($$props["autoPanOnNodeDrag"], true);
  let onerror = fallback($$props["onerror"], void 0);
  let ondelete = fallback($$props["ondelete"], void 0);
  let onedgecreate = fallback($$props["onedgecreate"], void 0);
  let attributionPosition = fallback($$props["attributionPosition"], void 0);
  let proOptions = fallback($$props["proOptions"], void 0);
  let defaultEdgeOptions2 = fallback($$props["defaultEdgeOptions"], void 0);
  let width = fallback($$props["width"], void 0);
  let height = fallback($$props["height"], void 0);
  let colorMode = fallback($$props["colorMode"], "light");
  let onconnect = fallback($$props["onconnect"], void 0);
  let onconnectstart = fallback($$props["onconnectstart"], void 0);
  let onconnectend = fallback($$props["onconnectend"], void 0);
  let onbeforedelete = fallback($$props["onbeforedelete"], void 0);
  let oninit = fallback($$props["oninit"], void 0);
  let nodeOrigin = fallback($$props["nodeOrigin"], void 0);
  let paneClickDistance = fallback($$props["paneClickDistance"], 0);
  let nodeClickDistance = fallback($$props["nodeClickDistance"], 0);
  let defaultMarkerColor = fallback($$props["defaultMarkerColor"], "#b1b1b7");
  let style = fallback($$props["style"], void 0);
  let className = fallback($$props["class"], void 0);
  const initViewport = store_get($$store_subs ??= {}, "$viewport", viewport) || initialViewport;
  const store = hasContext(key) ? useStore() : createStoreContext({
    nodes: get$1(nodes),
    edges: get$1(edges),
    width,
    height,
    fitView: fitView2,
    nodeOrigin,
    nodeExtent
  });
  const { initialized } = store;
  let onInitCalled = false;
  {
    if (!onInitCalled && store_get($$store_subs ??= {}, "$initialized", initialized)) {
      oninit?.();
      onInitCalled = true;
    }
  }
  {
    const updatableProps = {
      flowId: id,
      connectionLineType,
      connectionRadius,
      selectionMode,
      snapGrid,
      defaultMarkerColor,
      nodesDraggable,
      nodesConnectable,
      elementsSelectable,
      onlyRenderVisibleElements,
      isValidConnection,
      autoPanOnConnect,
      autoPanOnNodeDrag,
      onerror,
      ondelete,
      onedgecreate,
      connectionMode,
      nodeDragThreshold,
      onconnect,
      onconnectstart,
      onconnectend,
      onbeforedelete,
      nodeOrigin
    };
    updateStoreByKeys(store, updatableProps);
  }
  updateStore(store, {
    nodeTypes: nodeTypes2,
    edgeTypes,
    minZoom,
    maxZoom,
    translateExtent,
    paneClickDistance
  });
  colorModeClass = useColorModeClass(colorMode);
  $$payload.out += `<div${spread_attributes(
    {
      style,
      class: cc([
        "svelte-flow",
        className,
        store_get($$store_subs ??= {}, "$colorModeClass", colorModeClass)
      ]),
      "data-testid": "svelte-flow__wrapper",
      ...$$restProps,
      role: "application"
    },
    { "svelte-12wlba6": true }
  )}>`;
  KeyHandler($$payload, {
    selectionKey,
    deleteKey,
    panActivationKey,
    multiSelectionKey,
    zoomActivationKey
  });
  $$payload.out += `<!----> `;
  Zoom($$payload, {
    initialViewport: initViewport,
    onMoveStart,
    onMove,
    onMoveEnd,
    panOnScrollMode: panOnScrollMode === void 0 ? PanOnScrollMode.Free : panOnScrollMode,
    preventScrolling: preventScrolling === void 0 ? true : preventScrolling,
    zoomOnScroll: zoomOnScroll === void 0 ? true : zoomOnScroll,
    zoomOnDoubleClick: zoomOnDoubleClick === void 0 ? true : zoomOnDoubleClick,
    zoomOnPinch: zoomOnPinch === void 0 ? true : zoomOnPinch,
    panOnScroll: panOnScroll === void 0 ? false : panOnScroll,
    panOnDrag: panOnDrag === void 0 ? true : panOnDrag,
    paneClickDistance: paneClickDistance === void 0 ? 0 : paneClickDistance,
    children: ($$payload2) => {
      Pane($$payload2, {
        panOnDrag: panOnDrag === void 0 ? true : panOnDrag,
        selectionOnDrag,
        children: ($$payload3) => {
          Viewport($$payload3, {
            children: ($$payload4) => {
              EdgeRenderer($$payload4, { defaultEdgeOptions: defaultEdgeOptions2 });
              $$payload4.out += `<!----> `;
              ConnectionLine($$payload4, {
                containerStyle: connectionLineContainerStyle,
                style: connectionLineStyle,
                isCustomComponent: $$slots.connectionLine,
                $$slots: {
                  connectionLine: ($$payload5) => {
                    $$payload5.out += `<!---->`;
                    slot($$payload5, $$props, "connectionLine", {});
                    $$payload5.out += `<!---->`;
                  }
                }
              });
              $$payload4.out += `<!----> <div class="svelte-flow__edgelabel-renderer"></div> <div class="svelte-flow__viewport-portal"></div> `;
              NodeRenderer($$payload4, { nodeClickDistance });
              $$payload4.out += `<!----> `;
              NodeSelection($$payload4);
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          UserSelection($$payload3);
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Attribution($$payload, { proOptions, position: attributionPosition });
  $$payload.out += `<!----> <!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    id,
    nodes,
    edges,
    fitView: fitView2,
    fitViewOptions,
    minZoom,
    maxZoom,
    initialViewport,
    viewport,
    nodeTypes: nodeTypes2,
    edgeTypes,
    selectionKey,
    selectionMode,
    panActivationKey,
    multiSelectionKey,
    zoomActivationKey,
    nodesDraggable,
    nodesConnectable,
    nodeDragThreshold,
    elementsSelectable,
    snapGrid,
    deleteKey,
    connectionRadius,
    connectionLineType,
    connectionMode,
    connectionLineStyle,
    connectionLineContainerStyle,
    onMoveStart,
    onMove,
    onMoveEnd,
    isValidConnection,
    translateExtent,
    nodeExtent,
    onlyRenderVisibleElements,
    panOnScrollMode,
    preventScrolling,
    zoomOnScroll,
    zoomOnDoubleClick,
    zoomOnPinch,
    panOnScroll,
    panOnDrag,
    selectionOnDrag,
    autoPanOnConnect,
    autoPanOnNodeDrag,
    onerror,
    ondelete,
    onedgecreate,
    attributionPosition,
    proOptions,
    defaultEdgeOptions: defaultEdgeOptions2,
    width,
    height,
    colorMode,
    onconnect,
    onconnectstart,
    onconnectend,
    onbeforedelete,
    oninit,
    nodeOrigin,
    paneClickDistance,
    nodeClickDistance,
    defaultMarkerColor,
    style,
    class: className
  });
  pop();
}
function SvelteFlowProvider($$payload, $$props) {
  push();
  let initialNodes = fallback($$props["initialNodes"], void 0);
  let initialEdges = fallback($$props["initialEdges"], void 0);
  let initialWidth = fallback($$props["initialWidth"], void 0);
  let initialHeight = fallback($$props["initialHeight"], void 0);
  let fitView2 = fallback($$props["fitView"], void 0);
  let nodeOrigin = fallback($$props["nodeOrigin"], void 0);
  const store = createStore({
    nodes: initialNodes,
    edges: initialEdges,
    width: initialWidth,
    height: initialHeight,
    nodeOrigin,
    fitView: fitView2
  });
  setContext$1(key, { getStore: () => store });
  onDestroy(() => {
    store.reset();
  });
  $$payload.out += `<!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!---->`;
  bind_props($$props, {
    initialNodes,
    initialEdges,
    initialWidth,
    initialHeight,
    fitView: fitView2,
    nodeOrigin
  });
  pop();
}
function ControlButton($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class"]);
  push();
  let className = fallback($$props["class"], void 0);
  let bgColor = void 0;
  let bgColorHover = void 0;
  let color = void 0;
  let colorHover = void 0;
  let borderColor = void 0;
  $$payload.out += `<button${spread_attributes(
    {
      type: "button",
      class: cc(["svelte-flow__controls-button", className]),
      ...$$restProps
    },
    void 0,
    {
      "--xy-controls-button-background-color-props": bgColor,
      "--xy-controls-button-background-color-hover-props": bgColorHover,
      "--xy-controls-button-color-props": color,
      "--xy-controls-button-color-hover-props": colorHover,
      "--xy-controls-button-border-color-props": borderColor
    }
  )}><!---->`;
  slot($$payload, $$props, "default", { class: "button-svg" });
  $$payload.out += `<!----></button>`;
  bind_props($$props, { class: className });
  pop();
}
function Plus($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"></path></svg>`;
}
function Minus($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 5"><path d="M0 0h32v4.2H0z"></path></svg>`;
}
function Fit($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 30"><path d="M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"></path></svg>`;
}
function Lock($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32"><path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"></path></svg>`;
}
function Unlock($$payload) {
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32"><path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"></path></svg>`;
}
function Controls($$payload, $$props) {
  push();
  var $$store_subs;
  let isInteractive, minZoomReached, maxZoomReached, orientationClass;
  let position = fallback($$props["position"], "bottom-left");
  let showZoom = fallback($$props["showZoom"], true);
  let showFitView = fallback($$props["showFitView"], true);
  let showLock = fallback($$props["showLock"], true);
  let buttonBgColor = fallback($$props["buttonBgColor"], void 0);
  let buttonBgColorHover = fallback($$props["buttonBgColorHover"], void 0);
  let buttonColor = fallback($$props["buttonColor"], void 0);
  let buttonColorHover = fallback($$props["buttonColorHover"], void 0);
  let buttonBorderColor = fallback($$props["buttonBorderColor"], void 0);
  let ariaLabel = fallback($$props["ariaLabel"], void 0);
  let style = fallback($$props["style"], void 0);
  let orientation = fallback($$props["orientation"], "vertical");
  let fitViewOptions = fallback($$props["fitViewOptions"], void 0);
  let className = fallback($$props["class"], "");
  const {
    zoomIn,
    zoomOut,
    fitView: fitView2,
    viewport,
    minZoom,
    maxZoom,
    nodesDraggable,
    nodesConnectable,
    elementsSelectable
  } = useStore();
  const buttonProps = {
    bgColor: buttonBgColor,
    bgColorHover: buttonBgColorHover,
    color: buttonColor,
    colorHover: buttonColorHover,
    borderColor: buttonBorderColor
  };
  isInteractive = store_get($$store_subs ??= {}, "$nodesDraggable", nodesDraggable) || store_get($$store_subs ??= {}, "$nodesConnectable", nodesConnectable) || store_get($$store_subs ??= {}, "$elementsSelectable", elementsSelectable);
  minZoomReached = store_get($$store_subs ??= {}, "$viewport", viewport).zoom <= store_get($$store_subs ??= {}, "$minZoom", minZoom);
  maxZoomReached = store_get($$store_subs ??= {}, "$viewport", viewport).zoom >= store_get($$store_subs ??= {}, "$maxZoom", maxZoom);
  orientationClass = orientation === "horizontal" ? "horizontal" : "vertical";
  Panel($$payload, {
    class: cc([
      "svelte-flow__controls",
      orientationClass,
      className
    ]),
    position,
    "data-testid": "svelte-flow__controls",
    "aria-label": ariaLabel ?? "Svelte Flow controls",
    style,
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      slot($$payload2, $$props, "before", {});
      $$payload2.out += `<!----> `;
      if (showZoom) {
        $$payload2.out += "<!--[-->";
        ControlButton($$payload2, spread_props([
          {
            class: "svelte-flow__controls-zoomin",
            title: "zoom in",
            "aria-label": "zoom in",
            disabled: maxZoomReached
          },
          buttonProps,
          {
            children: ($$payload3) => {
              Plus($$payload3);
            },
            $$slots: { default: true }
          }
        ]));
        $$payload2.out += `<!----> `;
        ControlButton($$payload2, spread_props([
          {
            class: "svelte-flow__controls-zoomout",
            title: "zoom out",
            "aria-label": "zoom out",
            disabled: minZoomReached
          },
          buttonProps,
          {
            children: ($$payload3) => {
              Minus($$payload3);
            },
            $$slots: { default: true }
          }
        ]));
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (showFitView) {
        $$payload2.out += "<!--[-->";
        ControlButton($$payload2, spread_props([
          {
            class: "svelte-flow__controls-fitview",
            title: "fit view",
            "aria-label": "fit view"
          },
          buttonProps,
          {
            children: ($$payload3) => {
              Fit($$payload3);
            },
            $$slots: { default: true }
          }
        ]));
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (showLock) {
        $$payload2.out += "<!--[-->";
        ControlButton($$payload2, spread_props([
          {
            class: "svelte-flow__controls-interactive",
            title: "toggle interactivity",
            "aria-label": "toggle interactivity"
          },
          buttonProps,
          {
            children: ($$payload3) => {
              if (isInteractive) {
                $$payload3.out += "<!--[-->";
                Unlock($$payload3);
              } else {
                $$payload3.out += "<!--[!-->";
                Lock($$payload3);
              }
              $$payload3.out += `<!--]-->`;
            },
            $$slots: { default: true }
          }
        ]));
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <!---->`;
      slot($$payload2, $$props, "default", {});
      $$payload2.out += `<!----> <!---->`;
      slot($$payload2, $$props, "after", {});
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    position,
    showZoom,
    showFitView,
    showLock,
    buttonBgColor,
    buttonBgColorHover,
    buttonColor,
    buttonColorHover,
    buttonBorderColor,
    ariaLabel,
    style,
    orientation,
    fitViewOptions,
    class: className
  });
  pop();
}
var BackgroundVariant;
(function(BackgroundVariant2) {
  BackgroundVariant2["Lines"] = "lines";
  BackgroundVariant2["Dots"] = "dots";
  BackgroundVariant2["Cross"] = "cross";
})(BackgroundVariant || (BackgroundVariant = {}));
function DotPattern($$payload, $$props) {
  push();
  let radius = fallback($$props["radius"], 5);
  let className = fallback($$props["class"], "");
  $$payload.out += `<circle${attr("cx", radius)}${attr("cy", radius)}${attr("r", radius)}${attr("class", cc([
    "svelte-flow__background-pattern",
    "dots",
    className
  ]))}></circle>`;
  bind_props($$props, { radius, class: className });
  pop();
}
function LinePattern($$payload, $$props) {
  push();
  let lineWidth = fallback($$props["lineWidth"], 1);
  let dimensions = $$props["dimensions"];
  let variant = fallback($$props["variant"], void 0);
  let className = fallback($$props["class"], "");
  $$payload.out += `<path${attr("stroke-width", lineWidth)}${attr("d", `M${dimensions[0] / 2} 0 V${dimensions[1]} M0 ${dimensions[1] / 2} H${dimensions[0]}`)}${attr("class", cc([
    "svelte-flow__background-pattern",
    variant,
    className
  ]))}></path>`;
  bind_props($$props, {
    lineWidth,
    dimensions,
    variant,
    class: className
  });
  pop();
}
const defaultSize = {
  [BackgroundVariant.Dots]: 1,
  [BackgroundVariant.Lines]: 1,
  [BackgroundVariant.Cross]: 6
};
function Background($$payload, $$props) {
  push();
  var $$store_subs;
  let patternId, scaledGap, scaledSize, patternDimensions, patternOffset;
  let id = fallback($$props["id"], void 0);
  let variant = fallback($$props["variant"], () => BackgroundVariant.Dots, true);
  let gap = fallback($$props["gap"], 20);
  let size2 = fallback($$props["size"], 1);
  let lineWidth = fallback($$props["lineWidth"], 1);
  let bgColor = fallback($$props["bgColor"], void 0);
  let patternColor = fallback($$props["patternColor"], void 0);
  let patternClass = fallback($$props["patternClass"], void 0);
  let className = fallback($$props["class"], "");
  const { viewport, flowId } = useStore();
  const patternSize = size2 || defaultSize[variant];
  const isDots = variant === BackgroundVariant.Dots;
  const isCross = variant === BackgroundVariant.Cross;
  const gapXY = Array.isArray(gap) ? gap : [gap, gap];
  patternId = `background-pattern-${store_get($$store_subs ??= {}, "$flowId", flowId)}-${id ? id : ""}`;
  scaledGap = [
    gapXY[0] * store_get($$store_subs ??= {}, "$viewport", viewport).zoom || 1,
    gapXY[1] * store_get($$store_subs ??= {}, "$viewport", viewport).zoom || 1
  ];
  scaledSize = patternSize * store_get($$store_subs ??= {}, "$viewport", viewport).zoom;
  patternDimensions = isCross ? [scaledSize, scaledSize] : scaledGap;
  patternOffset = isDots ? [scaledSize / 2, scaledSize / 2] : [
    patternDimensions[0] / 2,
    patternDimensions[1] / 2
  ];
  $$payload.out += `<svg${add_styles({
    "--xy-background-color-props": bgColor,
    "--xy-background-pattern-color-props": patternColor
  })}${attr("class", `${stringify(cc(["svelte-flow__background", className]))} svelte-1r7pe8d`)} data-testid="svelte-flow__background"><pattern${attr("id", patternId)}${attr("x", store_get($$store_subs ??= {}, "$viewport", viewport).x % scaledGap[0])}${attr("y", store_get($$store_subs ??= {}, "$viewport", viewport).y % scaledGap[1])}${attr("width", scaledGap[0])}${attr("height", scaledGap[1])} patternUnits="userSpaceOnUse"${attr("patternTransform", `translate(-${patternOffset[0]},-${patternOffset[1]})`)}>`;
  if (isDots) {
    $$payload.out += "<!--[-->";
    DotPattern($$payload, { radius: scaledSize / 2, class: patternClass });
  } else {
    $$payload.out += "<!--[!-->";
    LinePattern($$payload, {
      dimensions: patternDimensions,
      variant,
      lineWidth,
      class: patternClass
    });
  }
  $$payload.out += `<!--]--></pattern><rect x="0" y="0" width="100%" height="100%"${attr("fill", `url(#${patternId})`)}></rect></svg>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, {
    id,
    variant,
    gap,
    size: size2,
    lineWidth,
    bgColor,
    patternColor,
    patternClass,
    class: className
  });
  pop();
}
const isNode = (element2) => isNodeBase(element2);
function useSvelteFlow() {
  const { zoomIn, zoomOut, fitView: fitView2, onbeforedelete, snapGrid, viewport, width, height, minZoom, maxZoom, panZoom, nodes, edges, domNode, nodeLookup, nodeOrigin, edgeLookup, connectionLookup } = useStore();
  const getNodeRect = (node) => {
    const $nodeLookup = get$1(nodeLookup);
    const nodeToUse = isNode(node) ? node : $nodeLookup.get(node.id);
    const position = nodeToUse.parentId ? evaluateAbsolutePosition(nodeToUse.position, nodeToUse.measured, nodeToUse.parentId, $nodeLookup, get$1(nodeOrigin)) : nodeToUse.position;
    const nodeWithPosition = {
      id: nodeToUse.id,
      position,
      width: nodeToUse.measured?.width ?? nodeToUse.width,
      height: nodeToUse.measured?.height ?? nodeToUse.height,
      data: nodeToUse.data
    };
    return nodeToRect(nodeWithPosition);
  };
  const updateNode = (id, nodeUpdate, options = { replace: false }) => {
    const node = get$1(nodeLookup).get(id)?.internals.userNode;
    if (!node) {
      return;
    }
    const nextNode = typeof nodeUpdate === "function" ? nodeUpdate(node) : nodeUpdate;
    if (options.replace) {
      nodes.update((nds) => nds.map((node2) => {
        if (node2.id === id) {
          return isNode(nextNode) ? nextNode : { ...node2, ...nextNode };
        }
        return node2;
      }));
    } else {
      Object.assign(node, nextNode);
      nodes.update((nds) => nds);
    }
  };
  const getInternalNode = (id) => get$1(nodeLookup).get(id);
  return {
    zoomIn,
    zoomOut,
    getInternalNode,
    getNode: (id) => getInternalNode(id)?.internals.userNode,
    getNodes: (ids) => ids === void 0 ? get$1(nodes) : getElements(get$1(nodeLookup), ids),
    getEdge: (id) => get$1(edgeLookup).get(id),
    getEdges: (ids) => ids === void 0 ? get$1(edges) : getElements(get$1(edgeLookup), ids),
    setZoom: (zoomLevel, options) => {
      const currentPanZoom = get$1(panZoom);
      return currentPanZoom ? currentPanZoom.scaleTo(zoomLevel, { duration: options?.duration }) : Promise.resolve(false);
    },
    getZoom: () => get$1(viewport).zoom,
    setViewport: async (nextViewport, options) => {
      const currentViewport = get$1(viewport);
      const currentPanZoom = get$1(panZoom);
      if (!currentPanZoom) {
        return Promise.resolve(false);
      }
      await currentPanZoom.setViewport({
        x: nextViewport.x ?? currentViewport.x,
        y: nextViewport.y ?? currentViewport.y,
        zoom: nextViewport.zoom ?? currentViewport.zoom
      }, { duration: options?.duration });
      return Promise.resolve(true);
    },
    getViewport: () => get$1(viewport),
    setCenter: async (x, y, options) => {
      const nextZoom = typeof options?.zoom !== "undefined" ? options.zoom : get$1(maxZoom);
      const currentPanZoom = get$1(panZoom);
      if (!currentPanZoom) {
        return Promise.resolve(false);
      }
      await currentPanZoom.setViewport({
        x: get$1(width) / 2 - x * nextZoom,
        y: get$1(height) / 2 - y * nextZoom,
        zoom: nextZoom
      }, { duration: options?.duration });
      return Promise.resolve(true);
    },
    fitView: fitView2,
    fitBounds: async (bounds, options) => {
      const currentPanZoom = get$1(panZoom);
      if (!currentPanZoom) {
        return Promise.resolve(false);
      }
      const viewport2 = getViewportForBounds(bounds, get$1(width), get$1(height), get$1(minZoom), get$1(maxZoom), options?.padding ?? 0.1);
      await currentPanZoom.setViewport(viewport2, { duration: options?.duration });
      return Promise.resolve(true);
    },
    getIntersectingNodes: (nodeOrRect, partially = true, nodesToIntersect) => {
      const isRect = isRectObject(nodeOrRect);
      const nodeRect = isRect ? nodeOrRect : getNodeRect(nodeOrRect);
      if (!nodeRect) {
        return [];
      }
      return (nodesToIntersect || get$1(nodes)).filter((n) => {
        const internalNode = get$1(nodeLookup).get(n.id);
        if (!internalNode || !isRect && n.id === nodeOrRect.id) {
          return false;
        }
        const currNodeRect = nodeToRect(internalNode);
        const overlappingArea = getOverlappingArea(currNodeRect, nodeRect);
        const partiallyVisible = partially && overlappingArea > 0;
        return partiallyVisible || overlappingArea >= nodeRect.width * nodeRect.height;
      });
    },
    isNodeIntersecting: (nodeOrRect, area, partially = true) => {
      const isRect = isRectObject(nodeOrRect);
      const nodeRect = isRect ? nodeOrRect : getNodeRect(nodeOrRect);
      if (!nodeRect) {
        return false;
      }
      const overlappingArea = getOverlappingArea(nodeRect, area);
      const partiallyVisible = partially && overlappingArea > 0;
      return partiallyVisible || overlappingArea >= nodeRect.width * nodeRect.height;
    },
    deleteElements: async ({ nodes: nodesToRemove = [], edges: edgesToRemove = [] }) => {
      const { nodes: matchingNodes, edges: matchingEdges } = await getElementsToRemove({
        nodesToRemove,
        edgesToRemove,
        nodes: get$1(nodes),
        edges: get$1(edges),
        onBeforeDelete: get$1(onbeforedelete)
      });
      if (matchingNodes) {
        nodes.update((nds) => nds.filter((node) => !matchingNodes.some(({ id }) => id === node.id)));
      }
      if (matchingEdges) {
        edges.update((eds) => eds.filter((edge) => !matchingEdges.some(({ id }) => id === edge.id)));
      }
      return {
        deletedNodes: matchingNodes,
        deletedEdges: matchingEdges
      };
    },
    screenToFlowPosition: (position, options = { snapToGrid: true }) => {
      const _domNode = get$1(domNode);
      if (!_domNode) {
        return position;
      }
      const _snapGrid = options.snapToGrid ? get$1(snapGrid) : false;
      const { x, y, zoom } = get$1(viewport);
      const { x: domX, y: domY } = _domNode.getBoundingClientRect();
      const correctedPosition = {
        x: position.x - domX,
        y: position.y - domY
      };
      return pointToRendererPoint(correctedPosition, [x, y, zoom], _snapGrid !== null, _snapGrid || [1, 1]);
    },
    /**
     *
     * @param position
     * @returns
     */
    flowToScreenPosition: (position) => {
      const _domNode = get$1(domNode);
      if (!_domNode) {
        return position;
      }
      const { x, y, zoom } = get$1(viewport);
      const { x: domX, y: domY } = _domNode.getBoundingClientRect();
      const rendererPosition = rendererPointToPoint(position, [x, y, zoom]);
      return {
        x: rendererPosition.x + domX,
        y: rendererPosition.y + domY
      };
    },
    toObject: () => {
      return {
        nodes: get$1(nodes).map((node) => ({
          ...node,
          // we want to make sure that changes to the nodes object that gets returned by toObject
          // do not affect the nodes object
          position: { ...node.position },
          data: { ...node.data }
        })),
        edges: get$1(edges).map((edge) => ({ ...edge })),
        viewport: { ...get$1(viewport) }
      };
    },
    updateNode,
    updateNodeData: (id, dataUpdate, options) => {
      const node = get$1(nodeLookup).get(id)?.internals.userNode;
      if (!node) {
        return;
      }
      const nextData = typeof dataUpdate === "function" ? dataUpdate(node) : dataUpdate;
      node.data = options?.replace ? nextData : { ...node.data, ...nextData };
      nodes.update((nds) => nds);
    },
    getNodesBounds: (nodes2) => {
      const _nodeLookup = get$1(nodeLookup);
      const _nodeOrigin = get$1(nodeOrigin);
      return getNodesBounds(nodes2, { nodeLookup: _nodeLookup, nodeOrigin: _nodeOrigin });
    },
    getHandleConnections: ({ type, id, nodeId }) => Array.from(get$1(connectionLookup).get(`${nodeId}-${type}-${id ?? null}`)?.values() ?? []),
    viewport
  };
}
function getElements(lookup, ids) {
  const result = [];
  for (const id of ids) {
    const item = lookup.get(id);
    if (item) {
      const element2 = "internals" in item ? item.internals?.userNode : item;
      result.push(element2);
    }
  }
  return result;
}
function ResizeControl($$payload, $$props) {
  push();
  let defaultPosition, controlPosition, positionClassNames, colorStyleProp, _style, controlStyle;
  let nodeId = fallback($$props["nodeId"], void 0);
  let position = fallback($$props["position"], void 0);
  let variant = fallback($$props["variant"], () => ResizeControlVariant.Handle, true);
  let color = fallback($$props["color"], void 0);
  let minWidth = fallback($$props["minWidth"], 10);
  let minHeight = fallback($$props["minHeight"], 10);
  let maxWidth = fallback($$props["maxWidth"], () => Number.MAX_VALUE, true);
  let maxHeight = fallback($$props["maxHeight"], () => Number.MAX_VALUE, true);
  let keepAspectRatio = fallback($$props["keepAspectRatio"], false);
  let shouldResize = fallback($$props["shouldResize"], void 0);
  let onResizeStart = fallback($$props["onResizeStart"], void 0);
  let onResize = fallback($$props["onResize"], void 0);
  let onResizeEnd = fallback($$props["onResizeEnd"], void 0);
  let style = fallback($$props["style"], "");
  let className = fallback($$props["class"], "");
  useStore();
  getContext$1("svelteflow__node_id");
  defaultPosition = variant === ResizeControlVariant.Line ? "right" : "bottom-right";
  controlPosition = position ?? defaultPosition;
  positionClassNames = controlPosition.split("-");
  colorStyleProp = variant === ResizeControlVariant.Line ? "border-color" : "background-color";
  _style = style ?? "";
  controlStyle = color ? `${_style} ${colorStyleProp}: ${color};` : _style;
  $$payload.out += `<div${attr("class", cc([
    "svelte-flow__resize-control",
    "nodrag",
    ...positionClassNames,
    variant,
    className
  ]))}${attr("style", controlStyle)}><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div>`;
  bind_props($$props, {
    nodeId,
    position,
    variant,
    color,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    keepAspectRatio,
    shouldResize,
    onResizeStart,
    onResize,
    onResizeEnd,
    style,
    class: className
  });
  pop();
}
function useNodes() {
  const { nodes } = useStore();
  return nodes;
}
function useEdges() {
  const { edges } = useStore();
  return edges;
}
let modelSelector = {
  draggedType: null,
  modelId: "none",
  isChatModel: false
};
let editor = {
  proximity: false,
  snapGrid: null,
  chatNodeExists: false
};
const connections = {
  "input": ["run", "batch"],
  "chat": ["run", "batch"],
  "module": ["function", "module", "list"],
  "function": ["function", "module", "run", "list"],
  "list": ["function", "module", "graph", "list"],
  "none": [""]
};
let chat = { "isVisible": false };
const defaultFunctions = {
  "functions": [
    {
      functionName: "Add",
      inputs: ["x", "y"],
      code: "return x + y",
      deletable: false,
      typedArgs: {}
    },
    {
      functionName: "Subtract",
      inputs: ["x", "y"],
      code: "return x - y",
      deletable: false,
      typedArgs: {}
    },
    {
      functionName: "Multiply",
      inputs: ["x", "y"],
      code: "return x * y",
      deletable: false,
      typedArgs: {}
    },
    {
      functionName: "Divide",
      inputs: ["x", "y"],
      code: "return x / y",
      deletable: false,
      typedArgs: {}
    }
  ]
};
function Function($$payload, $$props) {
  push();
  let { data } = $$props;
  let inputs = data.inputs;
  let typedInputs = data.typedArgs;
  const each_array = ensure_array_like(inputs);
  const each_array_1 = ensure_array_like(Object.keys(snapshot(typedInputs)));
  $$payload.out += `<div class="node"><div class="flex items-center border-b px-3 py-2 h-auto draggable"><small class="text-sm">${escape_html(data.functionName)}</small></div> <div class="flex flex-col gap-2 py-2 relative"><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let input = each_array[index];
    $$payload.out += `<div class="flex items-center relative h-7">`;
    Handle($$payload, {
      id: input,
      type: "target",
      position: Position.Left,
      class: "border-t",
      children: ($$payload2) => {
        $$payload2.out += `<span class="pl-5">${escape_html(input)}</span>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
    let input = each_array_1[index];
    $$payload.out += `<div class="flex items-center justify-between px-3 h-7 relative"><span>${escape_html(input.length > 5 ? input.slice(0, 5) + "..." : input)}</span> <input class="w-14 ml-3 nodrag"${attr("value", typedInputs[input])}></div>`;
  }
  $$payload.out += `<!--]--> `;
  Handle($$payload, {
    type: "source",
    position: Position.Right,
    class: "!absolute !top-1/2"
  });
  $$payload.out += `<!----></div></div>`;
  pop();
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function Textarea($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "value", "readonly"]);
  push();
  let className = fallback($$props["class"], void 0);
  let value = fallback($$props["value"], void 0);
  let readonly = fallback($$props["readonly"], void 0);
  $$payload.out += `<textarea${spread_attributes({
    class: cn("border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
    readonly,
    ...$$restProps
  })}>`;
  const $$body = escape_html(value);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea>`;
  bind_props($$props, { class: className, value, readonly });
  pop();
}
const PUBLIC_BACKEND_URL = "http://localhost:8000";
/**
 * @license lucide-svelte v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Icon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  push();
  let name = fallback($$props["name"], void 0);
  let color = fallback($$props["color"], "currentColor");
  let size2 = fallback($$props["size"], 24);
  let strokeWidth = fallback($$props["strokeWidth"], 2);
  let absoluteStrokeWidth = fallback($$props["absoluteStrokeWidth"], false);
  let iconNode = fallback($$props["iconNode"], () => [], true);
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    {
      ...defaultAttributes,
      ...$$restProps,
      width: size2,
      height: size2,
      stroke: color,
      "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size2) : strokeWidth,
      class: mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$sanitized_props.class)
    },
    void 0,
    void 0,
    3
  )}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [tag, attrs] = each_array[$$index];
    element($$payload, tag, () => {
      $$payload.out += `${spread_attributes({ ...attrs }, void 0, void 0, 3)}`;
    });
  }
  $$payload.out += `<!--]--><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></svg>`;
  bind_props($$props, {
    name,
    color,
    size: size2,
    strokeWidth,
    absoluteStrokeWidth,
    iconNode
  });
  pop();
}
function Arrow_up($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "m5 12 7-7 7 7" }],
    ["path", { "d": "M12 19V5" }]
  ];
  Icon($$payload, spread_props([
    { name: "arrow-up" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Chart_line($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { "d": "m19 9-5 5-4-4-3 3" }]
  ];
  Icon($$payload, spread_props([
    { name: "chart-line" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Check($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  Icon($$payload, spread_props([
    { name: "check" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Chevron_down($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-down" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Chevron_left($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-left" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Chevron_right($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-right" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Chevron_up($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m18 15-6-6-6 6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-up" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Clipboard($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "rect",
      {
        "width": "8",
        "height": "4",
        "x": "8",
        "y": "2",
        "rx": "1",
        "ry": "1"
      }
    ],
    [
      "path",
      {
        "d": "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "clipboard" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Code($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "polyline",
      { "points": "16 18 22 12 16 6" }
    ],
    ["polyline", { "points": "8 6 2 12 8 18" }]
  ];
  Icon($$payload, spread_props([
    { name: "code" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Download($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      }
    ],
    [
      "polyline",
      { "points": "7 10 12 15 17 10" }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "15",
        "y2": "3"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "download" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Grid_2x2($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M12 3v18" }],
    ["path", { "d": "M3 12h18" }],
    [
      "rect",
      {
        "x": "3",
        "y": "3",
        "width": "18",
        "height": "18",
        "rx": "2"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "grid-2x2" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Grip_vertical($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "circle",
      { "cx": "9", "cy": "12", "r": "1" }
    ],
    [
      "circle",
      { "cx": "9", "cy": "5", "r": "1" }
    ],
    [
      "circle",
      { "cx": "9", "cy": "19", "r": "1" }
    ],
    [
      "circle",
      { "cx": "15", "cy": "12", "r": "1" }
    ],
    [
      "circle",
      { "cx": "15", "cy": "5", "r": "1" }
    ],
    [
      "circle",
      { "cx": "15", "cy": "19", "r": "1" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "grip-vertical" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Grip($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "5", "r": "1" }
    ],
    [
      "circle",
      { "cx": "19", "cy": "5", "r": "1" }
    ],
    [
      "circle",
      { "cx": "5", "cy": "5", "r": "1" }
    ],
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "1" }
    ],
    [
      "circle",
      { "cx": "19", "cy": "12", "r": "1" }
    ],
    [
      "circle",
      { "cx": "5", "cy": "12", "r": "1" }
    ],
    [
      "circle",
      { "cx": "12", "cy": "19", "r": "1" }
    ],
    [
      "circle",
      { "cx": "19", "cy": "19", "r": "1" }
    ],
    [
      "circle",
      { "cx": "5", "cy": "19", "r": "1" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "grip" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Keyboard($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M10 8h.01" }],
    ["path", { "d": "M12 12h.01" }],
    ["path", { "d": "M14 8h.01" }],
    ["path", { "d": "M16 12h.01" }],
    ["path", { "d": "M18 8h.01" }],
    ["path", { "d": "M6 8h.01" }],
    ["path", { "d": "M7 16h10" }],
    ["path", { "d": "M8 12h.01" }],
    [
      "rect",
      {
        "width": "20",
        "height": "16",
        "x": "2",
        "y": "4",
        "rx": "2"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "keyboard" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Maximize_2($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["polyline", { "points": "15 3 21 3 21 9" }],
    ["polyline", { "points": "9 21 3 21 3 15" }],
    [
      "line",
      {
        "x1": "21",
        "x2": "14",
        "y1": "3",
        "y2": "10"
      }
    ],
    [
      "line",
      {
        "x1": "3",
        "x2": "10",
        "y1": "21",
        "y2": "14"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "maximize-2" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Message_square($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "message-square" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Pencil($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
      }
    ],
    ["path", { "d": "m15 5 4 4" }]
  ];
  Icon($$payload, spread_props([
    { name: "pencil" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Play($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "polygon",
      { "points": "6 3 20 12 6 21 6 3" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "play" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Plug_zap($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"
      }
    ],
    ["path", { "d": "m2 22 3-3" }],
    ["path", { "d": "M7.5 13.5 10 11" }],
    ["path", { "d": "M10.5 16.5 13 14" }],
    ["path", { "d": "m18 3-4 4h6l-4 4" }]
  ];
  Icon($$payload, spread_props([
    { name: "plug-zap" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Rotate_ccw($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
      }
    ],
    ["path", { "d": "M3 3v5h5" }]
  ];
  Icon($$payload, spread_props([
    { name: "rotate-ccw" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Trash_2($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M3 6h18" }],
    [
      "path",
      { "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }
    ],
    [
      "path",
      { "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }
    ],
    [
      "line",
      {
        "x1": "10",
        "x2": "10",
        "y1": "11",
        "y2": "17"
      }
    ],
    [
      "line",
      {
        "x1": "14",
        "x2": "14",
        "y1": "11",
        "y2": "17"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "trash-2" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Type($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "polyline",
      { "points": "4 7 4 4 20 4 20 7" }
    ],
    [
      "line",
      {
        "x1": "9",
        "x2": "15",
        "y1": "20",
        "y2": "20"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "4",
        "y2": "20"
      }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "type" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function X($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M18 6 6 18" }],
    ["path", { "d": "m6 6 12 12" }]
  ];
  Icon($$payload, spread_props([
    { name: "x" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Input$1($$payload, $$props) {
  push();
  useSvelteFlow();
  let { id, data } = $$props;
  $$payload.out += `<div class="node !min-w-52 !max-w-52 p-3"><div class="flex items-center mb-2 justify-between">Prompt <button>`;
  {
    $$payload.out += "<!--[!-->";
    Type($$payload, { class: "w-5 h-5" });
  }
  $$payload.out += `<!--]--></button></div> <div>`;
  {
    $$payload.out += "<!--[!-->";
    Textarea($$payload, {
      value: data.text,
      class: "resize-none bg-ui-3 nodrag"
    });
  }
  $$payload.out += `<!--]--></div> `;
  Handle($$payload, { type: "source", position: Position.Right });
  $$payload.out += `<!----></div>`;
  pop();
}
function Module($$payload, $$props) {
  push();
  let { id, type, data } = $$props;
  data.isVariable = data.moduleName.includes("<VAR>");
  data.variable = data.variable || "";
  data.index = data.index || "";
  let variable = data.variable;
  data.index;
  let shortenedName = data.moduleName.includes(".") ? data.moduleName.split(".").at(-1) : data.moduleName;
  $$payload.out += `<div class="node flex p-3 justify-center" role="region"><div class="flex">`;
  if (data.isVariable) {
    $$payload.out += "<!--[-->";
    $$payload.out += `${escape_html(shortenedName === "<VAR>" ? "layers" : shortenedName)}`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(shortenedName)}`;
  }
  $$payload.out += `<!--]--> `;
  if (data.isVariable) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="border-l pl-2 ml-2"><input class="border rounded-md w-12 text-center nodrag" type="text"${attr("value", variable)}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> `;
  Handle($$payload, {
    id: "left-target",
    type: "target",
    position: Position.Left,
    onconnect: () => data.location = "input"
  });
  $$payload.out += `<!----> `;
  Handle($$payload, {
    id: "right-target",
    type: "target",
    position: Position.Right,
    onconnect: () => data.location = "output"
  });
  $$payload.out += `<!----> `;
  Handle($$payload, {
    id: "right-source",
    type: "source",
    position: Position.Right,
    class: "!bg-transparent",
    onconnect: () => data.location = "output"
  });
  $$payload.out += `<!----> `;
  Handle($$payload, {
    id: "left-source",
    type: "source",
    position: Position.Left,
    class: "!bg-transparent",
    onconnect: () => data.location = "input"
  });
  $$payload.out += `<!----></div>`;
  pop();
}
function List($$payload, $$props) {
  push();
  let { type, data } = $$props;
  $$payload.out += `<div class="node p-3">${escape_html(type)} `;
  Handle($$payload, { type: "target", position: Position.Left });
  $$payload.out += `<!----> `;
  Handle($$payload, { type: "source", position: Position.Right });
  $$payload.out += `<!----></div>`;
  pop();
}
function Chat($$payload, $$props) {
  push();
  $$payload.out += `<div class="node justify-between flex p-3 !bg-green-950 !border-green-500">Chat <button>`;
  Message_square($$payload, { class: "h-5 w-5" });
  $$payload.out += `<!----></button> `;
  Handle($$payload, { type: "source", position: Position.Right });
  $$payload.out += `<!----></div>`;
  pop();
}
function Line($$payload, $$props) {
  push();
  let { dataToGraph = void 0 } = $$props;
  onDestroy(() => {
  });
  $$payload.out += `<canvas class="chart"></canvas>`;
  bind_props($$props, { dataToGraph });
  pop();
}
const buttonVariants = tv({
  base: "ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: { variant: "default", size: "default" }
});
function Button($$payload, $$props) {
  push();
  let {
    class: className,
    variant = "default",
    size: size2 = "default",
    ref = null,
    href = void 0,
    type = "button",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (href) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a${spread_attributes({
      class: cn(buttonVariants({ variant, size: size2, className })),
      href,
      ...restProps
    })}>`;
    children?.($$payload);
    $$payload.out += `<!----></a>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({
      class: cn(buttonVariants({ variant, size: size2, className })),
      type,
      ...restProps
    })}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Heatmap($$payload, $$props) {
  push();
  $$payload.out += `<div role="img"></div>`;
  pop();
}
function isFunction(value) {
  return typeof value === "function";
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
const BoxSymbol = Symbol("box");
const isWritableSymbol = Symbol("is-writable");
function isBox(value) {
  return isObject(value) && BoxSymbol in value;
}
function isWritableBox(value) {
  return box.isBox(value) && isWritableSymbol in value;
}
function box(initialValue) {
  let current = initialValue;
  return {
    [BoxSymbol]: true,
    [isWritableSymbol]: true,
    get current() {
      return current;
    },
    set current(v) {
      current = v;
    }
  };
}
function boxWith(getter, setter) {
  const derived2 = getter();
  if (setter) {
    return {
      [BoxSymbol]: true,
      [isWritableSymbol]: true,
      get current() {
        return derived2;
      },
      set current(v) {
        setter(v);
      }
    };
  }
  return {
    [BoxSymbol]: true,
    get current() {
      return getter();
    }
  };
}
function boxFrom(value) {
  if (box.isBox(value)) return value;
  if (isFunction(value)) return box.with(value);
  return box(value);
}
function boxFlatten(boxes) {
  return Object.entries(boxes).reduce(
    (acc, [key2, b]) => {
      if (!box.isBox(b)) {
        return Object.assign(acc, { [key2]: b });
      }
      if (box.isWritableBox(b)) {
        Object.defineProperty(acc, key2, {
          get() {
            return b.current;
          },
          set(v) {
            b.current = v;
          }
        });
      } else {
        Object.defineProperty(acc, key2, {
          get() {
            return b.current;
          }
        });
      }
      return acc;
    },
    {}
  );
}
function toReadonlyBox(b) {
  if (!box.isWritableBox(b)) return b;
  return {
    [BoxSymbol]: true,
    get current() {
      return b.current;
    }
  };
}
box.from = boxFrom;
box.with = boxWith;
box.flatten = boxFlatten;
box.readonly = toReadonlyBox;
box.isBox = isBox;
box.isWritableBox = isWritableBox;
function composeHandlers(...handlers) {
  return function(e) {
    for (const handler of handlers) {
      if (!handler)
        continue;
      if (e.defaultPrevented)
        return;
      if (typeof handler === "function") {
        handler.call(this, e);
      } else {
        handler.current?.call(this, e);
      }
    }
  };
}
const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char))
    return void 0;
  return char !== char.toLowerCase();
}
function splitByCase(str) {
  const parts = [];
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = STR_SPLITTERS.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function pascalCase(str) {
  if (!str)
    return "";
  return splitByCase(str).map((p) => upperFirst(p)).join("");
}
function camelCase(str) {
  return lowerFirst(pascalCase(str || ""));
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
  return str ? str[0].toLowerCase() + str.slice(1) : "";
}
function cssToStyleObj(css) {
  if (!css)
    return {};
  const styleObj = {};
  function iterator(name, value) {
    if (name.startsWith("-moz-") || name.startsWith("-webkit-") || name.startsWith("-ms-") || name.startsWith("-o-")) {
      styleObj[pascalCase(name)] = value;
      return;
    }
    if (name.startsWith("--")) {
      styleObj[name] = value;
      return;
    }
    styleObj[camelCase(name)] = value;
  }
  parse(css, iterator);
  return styleObj;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function createParser(matcher, replacer) {
  const regex = RegExp(matcher, "g");
  return (str) => {
    if (typeof str !== "string") {
      throw new TypeError(`expected an argument of type string, but got ${typeof str}`);
    }
    if (!str.match(regex))
      return str;
    return str.replace(regex, replacer);
  };
}
const camelToKebab = createParser(/[A-Z]/, (match) => `-${match.toLowerCase()}`);
function styleToCSS(styleObj) {
  if (!styleObj || typeof styleObj !== "object" || Array.isArray(styleObj)) {
    throw new TypeError(`expected an argument of type object, but got ${typeof styleObj}`);
  }
  return Object.keys(styleObj).map((property) => `${camelToKebab(property)}: ${styleObj[property]};`).join("\n");
}
function styleToString(style = {}) {
  return styleToCSS(style).replace("\n", " ");
}
const srOnlyStyles = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: "0",
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: "0",
  transform: "translateX(-100%)"
};
styleToString(srOnlyStyles);
function isEventHandler(key2) {
  return key2.length > 2 && key2.startsWith("on") && key2[2] === key2[2]?.toLowerCase();
}
function mergeProps(...args) {
  const result = { ...args[0] };
  for (let i = 1; i < args.length; i++) {
    const props = args[i];
    for (const key2 in props) {
      const a = result[key2];
      const b = props[key2];
      const aIsFunction = typeof a === "function";
      const bIsFunction = typeof b === "function";
      if (aIsFunction && typeof bIsFunction && isEventHandler(key2)) {
        const aHandler = a;
        const bHandler = b;
        result[key2] = composeHandlers(aHandler, bHandler);
      } else if (aIsFunction && bIsFunction) {
        result[key2] = executeCallbacks(a, b);
      } else if (key2 === "class" && typeof a === "string" && typeof b === "string") {
        result[key2] = clsx(a, b);
      } else if (key2 === "style") {
        const aIsObject = typeof a === "object";
        const bIsObject = typeof b === "object";
        const aIsString = typeof a === "string";
        const bIsString = typeof b === "string";
        if (aIsObject && bIsObject) {
          result[key2] = { ...a, ...b };
        } else if (aIsObject && bIsString) {
          const parsedStyle = cssToStyleObj(b);
          result[key2] = { ...a, ...parsedStyle };
        } else if (aIsString && bIsObject) {
          const parsedStyle = cssToStyleObj(a);
          result[key2] = { ...parsedStyle, ...b };
        } else if (aIsString && bIsString) {
          const parsedStyleA = cssToStyleObj(a);
          const parsedStyleB = cssToStyleObj(b);
          result[key2] = { ...parsedStyleA, ...parsedStyleB };
        } else if (aIsObject) {
          result[key2] = a;
        } else if (bIsObject) {
          result[key2] = b;
        }
      } else {
        result[key2] = b !== void 0 ? b : a;
      }
    }
  }
  if (typeof result.style === "object") {
    result.style = styleToString(result.style).replaceAll("\n", " ");
  }
  if (result.hidden !== true) {
    result.hidden = void 0;
  }
  if (result.disabled !== true) {
    result.disabled = void 0;
  }
  return result;
}
function useRefById({
  id,
  ref,
  deps = () => true,
  onRefChange = () => {
  },
  getRootNode = () => typeof document !== "undefined" ? document : void 0
}) {
  (() => deps())();
  (() => getRootNode())();
}
function afterTick(fn) {
  tick().then(fn);
}
class ElementSize {
  #size = { width: 0, height: 0 };
  constructor(node, options = { box: "border-box" }) {
    this.#size = {
      width: options.initialSize?.width ?? 0,
      height: options.initialSize?.height ?? 0
    };
  }
  get width() {
    return this.#size.width;
  }
  get height() {
    return this.#size.height;
  }
}
class Previous {
  #previous;
  #curr;
  constructor(getter) {
  }
  get current() {
    return this.#previous;
  }
}
function getDataOpenClosed(condition) {
  return condition ? "open" : "closed";
}
function getAriaDisabled(condition) {
  return condition ? "true" : "false";
}
function getAriaExpanded(condition) {
  return condition ? "true" : "false";
}
function getDataDisabled(condition) {
  return condition ? "" : void 0;
}
function getAriaSelected(condition) {
  return condition ? "true" : "false";
}
function getAriaOrientation(orientation) {
  return orientation;
}
function getAriaHidden(condition) {
  return condition ? "true" : void 0;
}
function getDataOrientation(orientation) {
  return orientation;
}
function getHidden(condition) {
  return condition ? true : void 0;
}
function getDisabled(condition) {
  return condition ? true : void 0;
}
function getAriaPressed(condition) {
  return condition ? "true" : "false";
}
function getRequired(condition) {
  return condition ? true : void 0;
}
const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
const ARROW_UP = "ArrowUp";
const END = "End";
const ENTER = "Enter";
const ESCAPE = "Escape";
const HOME = "Home";
const PAGE_DOWN = "PageDown";
const PAGE_UP = "PageUp";
const SPACE = " ";
const TAB = "Tab";
function getElemDirection(elem) {
  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");
  return direction;
}
function getNextKey(dir = "ltr", orientation = "horizontal") {
  return {
    horizontal: dir === "rtl" ? ARROW_LEFT : ARROW_RIGHT,
    vertical: ARROW_DOWN
  }[orientation];
}
function getPrevKey(dir = "ltr", orientation = "horizontal") {
  return {
    horizontal: dir === "rtl" ? ARROW_RIGHT : ARROW_LEFT,
    vertical: ARROW_UP
  }[orientation];
}
function getDirectionalKeys(dir = "ltr", orientation = "horizontal") {
  if (!["ltr", "rtl"].includes(dir))
    dir = "ltr";
  if (!["horizontal", "vertical"].includes(orientation))
    orientation = "horizontal";
  return {
    nextKey: getNextKey(dir, orientation),
    prevKey: getPrevKey(dir, orientation)
  };
}
const isBrowser = typeof document !== "undefined";
function isHTMLElement(element2) {
  return element2 instanceof HTMLElement;
}
function isElement(element2) {
  return element2 instanceof Element;
}
function isElementOrSVGElement(element2) {
  return element2 instanceof Element || element2 instanceof SVGElement;
}
function isNotNull(value) {
  return value !== null;
}
function isSelectableInput(element2) {
  return element2 instanceof HTMLInputElement && "select" in element2;
}
function isElementHidden(node, stopAt) {
  if (getComputedStyle(node).visibility === "hidden")
    return true;
  while (node) {
    if (stopAt !== void 0 && node === stopAt)
      return false;
    if (getComputedStyle(node).display === "none")
      return true;
    node = node.parentElement;
  }
  return false;
}
function useRovingFocus(props) {
  const currentTabStopId = props.currentTabStopId ? props.currentTabStopId : box(null);
  function getCandidateNodes() {
    if (!isBrowser) return [];
    const node = document.getElementById(props.rootNodeId.current);
    if (!node) return [];
    if (props.candidateSelector) {
      const candidates = Array.from(node.querySelectorAll(props.candidateSelector));
      return candidates;
    } else {
      const candidates = Array.from(node.querySelectorAll(`[${props.candidateAttr}]:not([data-disabled])`));
      return candidates;
    }
  }
  function focusFirstCandidate() {
    const items = getCandidateNodes();
    if (!items.length) return;
    items[0]?.focus();
  }
  function handleKeydown(node, e, both = false) {
    const rootNode = document.getElementById(props.rootNodeId.current);
    if (!rootNode || !node) return;
    const items = getCandidateNodes();
    if (!items.length) return;
    const currentIndex = items.indexOf(node);
    const dir = getElemDirection(rootNode);
    const { nextKey, prevKey } = getDirectionalKeys(dir, props.orientation.current);
    const loop = props.loop.current;
    const keyToIndex = {
      [nextKey]: currentIndex + 1,
      [prevKey]: currentIndex - 1,
      [HOME]: 0,
      [END]: items.length - 1
    };
    if (both) {
      const altNextKey = nextKey === ARROW_DOWN ? ARROW_RIGHT : ARROW_DOWN;
      const altPrevKey = prevKey === ARROW_UP ? ARROW_LEFT : ARROW_UP;
      keyToIndex[altNextKey] = currentIndex + 1;
      keyToIndex[altPrevKey] = currentIndex - 1;
    }
    let itemIndex = keyToIndex[e.key];
    if (itemIndex === void 0) return;
    e.preventDefault();
    if (itemIndex < 0 && loop) {
      itemIndex = items.length - 1;
    } else if (itemIndex === items.length && loop) {
      itemIndex = 0;
    }
    const itemToFocus = items[itemIndex];
    if (!itemToFocus) return;
    itemToFocus.focus();
    currentTabStopId.current = itemToFocus.id;
    props.onCandidateFocus?.(itemToFocus);
    return itemToFocus;
  }
  function getTabIndex(node) {
    const items = getCandidateNodes();
    const anyActive = currentTabStopId.current !== null;
    if (node && !anyActive && items[0] === node) {
      currentTabStopId.current = node.id;
      return 0;
    } else if (node?.id === currentTabStopId.current) {
      return 0;
    }
    return -1;
  }
  return {
    setCurrentTabStopId(id) {
      currentTabStopId.current = id;
    },
    getTabIndex,
    handleKeydown,
    focusFirstCandidate,
    currentTabStopId
  };
}
function setContext(key2, value) {
  return setContext$1(key2, value);
}
function getContext(key2, fallback2) {
  const trueKey = typeof key2 === "symbol" ? key2 : key2;
  const description = typeof key2 === "symbol" ? key2.description : key2;
  if (!hasContext(trueKey)) {
    if (fallback2 === void 0) {
      throw new Error(`Missing context dependency: ${description} and no fallback was provided.`);
    }
    return fallback2;
  }
  return getContext$1(key2);
}
function getSymbolDescription(providerComponentName, contextName) {
  if (typeof providerComponentName === "string" && contextName === void 0) {
    return `${providerComponentName}Context`;
  } else if (Array.isArray(providerComponentName) && contextName === void 0) {
    return `${providerComponentName[0]}Context`;
  } else {
    return `${providerComponentName}Context`;
  }
}
function createContext(providerComponentName, contextName, useSymbol = true) {
  const symbolDescription = getSymbolDescription(providerComponentName, contextName);
  const symbol = Symbol.for(`bits-ui.${symbolDescription}`);
  const key2 = symbolDescription;
  function getCtx(fallback2) {
    const context = getContext(useSymbol ? symbol : key2, fallback2);
    if (context === void 0) {
      throw new Error(`Context \`${symbolDescription}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(", ")}` : `\`${providerComponentName}\``}`);
    }
    if (context === null)
      return context;
    return context;
  }
  function setCtx(value) {
    if (useSymbol) {
      return setContext(symbol, value);
    } else {
      return setContext(key2, value);
    }
  }
  return [setCtx, getCtx];
}
globalThis.bitsIdCounter ??= { current: 0 };
function useId(prefix = "bits") {
  globalThis.bitsIdCounter.current++;
  return `${prefix}-${globalThis.bitsIdCounter.current}`;
}
function noop() {
}
function useStateMachine(initialState, machine) {
  const state = box(initialState);
  function reducer(event) {
    const nextState = machine[state.current][event];
    return nextState ?? state.current;
  }
  const dispatch = (event) => {
    state.current = reducer(event);
  };
  return { state, dispatch };
}
function usePresence(present, id) {
  const initialState = present.current ? "mounted" : "unmounted";
  const { state, dispatch } = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
    unmounted: { MOUNT: "mounted" }
  });
  const isPresentDerived = ["mounted", "unmountSuspended"].includes(state.current);
  return {
    get current() {
      return isPresentDerived;
    }
  };
}
function Presence_layer($$payload, $$props) {
  push();
  let { present, forceMount, presence, id } = $$props;
  const isPresent = usePresence(box.with(() => present), box.with(() => id));
  if (forceMount || present || isPresent.current) {
    $$payload.out += "<!--[-->";
    presence?.($$payload, { present: isPresent });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function createAttrs(variant) {
  return {
    content: `data-${variant}-content`,
    trigger: `data-${variant}-trigger`,
    overlay: `data-${variant}-overlay`,
    title: `data-${variant}-title`,
    description: `data-${variant}-description`,
    close: `data-${variant}-close`,
    cancel: `data-${variant}-cancel`,
    action: `data-${variant}-action`
  };
}
class DialogRootState {
  open;
  variant;
  triggerNode = null;
  titleNode = null;
  contentNode = null;
  descriptionNode = null;
  contentId = void 0;
  titleId = void 0;
  triggerId = void 0;
  descriptionId = void 0;
  cancelNode = null;
  #attrs = once(() => createAttrs(this.variant.current));
  get attrs() {
    return this.#attrs();
  }
  constructor(props) {
    this.open = props.open;
    this.variant = props.variant;
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen() {
    if (this.open.current) return;
    this.open.current = true;
  }
  handleClose() {
    if (!this.open.current) return;
    this.open.current = false;
  }
  #sharedProps = once(() => ({
    "data-state": getDataOpenClosed(this.open.current)
  }));
  get sharedProps() {
    return this.#sharedProps();
  }
}
class DialogTriggerState {
  #id;
  #ref;
  #root;
  #disabled;
  constructor(props, root) {
    this.#id = props.id;
    this.#root = root;
    this.#ref = props.ref;
    this.#disabled = props.disabled;
    this.onclick = this.onclick.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.#root.triggerNode = node;
        this.#root.triggerId = node?.id;
      }
    });
  }
  onclick = (e) => {
    if (this.#disabled.current) return;
    if (e.button > 0) return;
    this.#root.handleOpen();
  };
  onpointerdown = (e) => {
    if (this.#disabled.current) return;
    if (e.button > 0) return;
    e.preventDefault();
  };
  onkeydown = (e) => {
    if (this.#disabled.current) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.#root.handleOpen();
    }
  };
  #props = once(() => ({
    id: this.#id.current,
    "aria-haspopup": "dialog",
    "aria-expanded": getAriaExpanded(this.#root.open.current),
    "aria-controls": this.#root.contentId,
    [this.#root.attrs.trigger]: "",
    onpointerdown: this.onpointerdown,
    onkeydown: this.onkeydown,
    onclick: this.onclick,
    ...this.#root.sharedProps
  }));
  get props() {
    return this.#props();
  }
}
class DialogCloseState {
  #id;
  #ref;
  #root;
  #variant;
  #disabled;
  #attr = once(() => this.#root.attrs[this.#variant.current]);
  constructor(props, root) {
    this.#root = root;
    this.#ref = props.ref;
    this.#id = props.id;
    this.#variant = props.variant;
    this.#disabled = props.disabled;
    this.onclick = this.onclick.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.#root.open.current
    });
  }
  onclick(e) {
    if (this.#disabled.current) return;
    if (e.button > 0) return;
    this.#root.handleClose();
  }
  onpointerdown(e) {
    if (this.#disabled.current) return;
    if (e.button > 0) return;
    e.preventDefault();
    this.#root.handleClose();
  }
  onkeydown(e) {
    if (this.#disabled.current) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.#root.handleClose();
    }
  }
  #props = once(() => ({
    id: this.#id.current,
    [this.#attr()]: "",
    onpointerdown: this.onpointerdown,
    onclick: this.onclick,
    onkeydown: this.onkeydown,
    ...this.#root.sharedProps
  }));
  get props() {
    return this.#props();
  }
}
class DialogTitleState {
  #id;
  #ref;
  #root;
  #level;
  constructor(props, root) {
    this.#id = props.id;
    this.#root = root;
    this.#ref = props.ref;
    this.#level = props.level;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.#root.titleNode = node;
        this.#root.titleId = node?.id;
      },
      deps: () => this.#root.open.current
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "heading",
    "aria-level": this.#level.current,
    [this.#root.attrs.title]: "",
    ...this.#root.sharedProps
  }));
  get props() {
    return this.#props();
  }
}
class DialogContentState {
  #id;
  #ref;
  root;
  constructor(props, root) {
    this.#id = props.id;
    this.root = root;
    this.#ref = props.ref;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.root.open.current,
      onRefChange: (node) => {
        this.root.contentNode = node;
        this.root.contentId = node?.id;
      }
    });
  }
  #snippetProps = once(() => ({ open: this.root.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #props = once(() => ({
    id: this.#id.current,
    role: this.root.variant.current === "alert-dialog" ? "alertdialog" : "dialog",
    "aria-describedby": this.root.descriptionId,
    "aria-labelledby": this.root.titleId,
    [this.root.attrs.content]: "",
    style: { pointerEvents: "auto" },
    ...this.root.sharedProps
  }));
  get props() {
    return this.#props();
  }
}
class DialogOverlayState {
  #id;
  #ref;
  root;
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.root = root;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.root.open.current
    });
  }
  #snippetProps = once(() => ({ open: this.root.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #props = once(() => ({
    id: this.#id.current,
    [this.root.attrs.overlay]: "",
    style: { pointerEvents: "auto" },
    ...this.root.sharedProps
  }));
  get props() {
    return this.#props();
  }
}
const [setDialogRootContext, getDialogRootContext] = createContext("Dialog.Root");
function useDialogRoot(props) {
  return setDialogRootContext(new DialogRootState(props));
}
function useDialogTrigger(props) {
  const root = getDialogRootContext();
  return new DialogTriggerState(props, root);
}
function useDialogTitle(props) {
  return new DialogTitleState(props, getDialogRootContext());
}
function useDialogContent(props) {
  return new DialogContentState(props, getDialogRootContext());
}
function useDialogOverlay(props) {
  return new DialogOverlayState(props, getDialogRootContext());
}
function useDialogClose(props) {
  return new DialogCloseState(props, getDialogRootContext());
}
function Dialog_title$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    level = 2,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const titleState = useDialogTitle({
    id: box.with(() => id),
    level: box.with(() => level),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, titleState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Portal$1($$payload, $$props) {
  push();
  let { to = "body", children, disabled } = $$props;
  getAllContexts();
  getTarget();
  function getTarget() {
    if (!isBrowser || disabled) return null;
    let localTarget = null;
    if (typeof to === "string") {
      localTarget = document.querySelector(to);
    } else if (to instanceof HTMLElement || to instanceof DocumentFragment) {
      localTarget = to;
    } else ;
    return localTarget;
  }
  if (disabled) {
    $$payload.out += "<!--[-->";
    children?.($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function debounce(fn, wait = 500) {
  let timeout = null;
  const debounced = (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  };
  debounced.destroy = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  return debounced;
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
class DismissibleLayerState {
  #interactOutsideProp;
  #behaviorType;
  #interceptedEvents = { pointerdown: false };
  #isResponsibleLayer = false;
  node = box(null);
  #documentObj = void 0;
  #enabled;
  #isFocusInsideDOMTree = false;
  #onFocusOutside;
  currNode = null;
  #isValidEventProp;
  #unsubClickListener = noop;
  constructor(props) {
    this.#enabled = props.enabled;
    this.#isValidEventProp = props.isValidEvent;
    useRefById({
      id: props.id,
      ref: this.node,
      deps: () => this.#enabled.current,
      onRefChange: (node) => {
        this.currNode = node;
      }
    });
    this.#behaviorType = props.interactOutsideBehavior;
    this.#interactOutsideProp = props.onInteractOutside;
    this.#onFocusOutside = props.onFocusOutside;
  }
  #handleFocus = (event) => {
    if (event.defaultPrevented) return;
    if (!this.currNode) return;
    afterTick(() => {
      if (!this.currNode || this.#isTargetWithinLayer(event.target)) return;
      if (event.target && !this.#isFocusInsideDOMTree) {
        this.#onFocusOutside.current?.(event);
      }
    });
  };
  #addEventListeners() {
    return executeCallbacks(
      /**
      * CAPTURE INTERACTION START
      * mark interaction-start event as intercepted.
      * mark responsible layer during interaction start
      * to avoid checking if is responsible layer during interaction end
      * when a new floating element may have been opened.
      */
      addEventListener(this.#documentObj, "pointerdown", executeCallbacks(this.#markInterceptedEvent, this.#markResponsibleLayer), true),
      /**
      * BUBBLE INTERACTION START
      * Mark interaction-start event as non-intercepted. Debounce `onInteractOutsideStart`
      * to avoid prematurely checking if other events were intercepted.
      */
      addEventListener(this.#documentObj, "pointerdown", executeCallbacks(this.#markNonInterceptedEvent, this.#handleInteractOutside)),
      /**
      * HANDLE FOCUS OUTSIDE
      */
      addEventListener(this.#documentObj, "focusin", this.#handleFocus)
    );
  }
  #handleDismiss = (e) => {
    let event = e;
    if (event.defaultPrevented) {
      event = createWrappedEvent(e);
    }
    this.#interactOutsideProp.current(e);
  };
  #handleInteractOutside = debounce(
    (e) => {
      if (!this.currNode) {
        this.#unsubClickListener();
        return;
      }
      const isEventValid = this.#isValidEventProp.current(e, this.currNode) || isValidEvent(e, this.currNode);
      if (!this.#isResponsibleLayer || this.#isAnyEventIntercepted() || !isEventValid) {
        this.#unsubClickListener();
        return;
      }
      let event = e;
      if (event.defaultPrevented) {
        event = createWrappedEvent(event);
      }
      if (this.#behaviorType.current !== "close" && this.#behaviorType.current !== "defer-otherwise-close") {
        this.#unsubClickListener();
        return;
      }
      if (e.pointerType === "touch") {
        this.#unsubClickListener();
        this.#unsubClickListener = addEventListener(this.#documentObj, "click", this.#handleDismiss, { once: true });
      } else {
        this.#interactOutsideProp.current(event);
      }
    },
    10
  );
  #markInterceptedEvent = (e) => {
    this.#interceptedEvents[e.type] = true;
  };
  #markNonInterceptedEvent = (e) => {
    this.#interceptedEvents[e.type] = false;
  };
  #markResponsibleLayer = () => {
    if (!this.node.current) return;
    this.#isResponsibleLayer = isResponsibleLayer(this.node.current);
  };
  #isTargetWithinLayer = (target) => {
    if (!this.node.current) return false;
    return isOrContainsTarget(this.node.current, target);
  };
  #resetState = debounce(
    () => {
      for (const eventType in this.#interceptedEvents) {
        this.#interceptedEvents[eventType] = false;
      }
      this.#isResponsibleLayer = false;
    },
    20
  );
  #isAnyEventIntercepted() {
    const i = Object.values(this.#interceptedEvents).some(Boolean);
    return i;
  }
  #onfocuscapture = () => {
    this.#isFocusInsideDOMTree = true;
  };
  #onblurcapture = () => {
    this.#isFocusInsideDOMTree = false;
  };
  props = {
    onfocuscapture: this.#onfocuscapture,
    onblurcapture: this.#onblurcapture
  };
}
function useDismissibleLayer(props) {
  return new DismissibleLayerState(props);
}
function getTopMostLayer(layersArr) {
  return layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
}
function isResponsibleLayer(node) {
  const layersArr = [...globalThis.bitsDismissableLayers];
  const topMostLayer = getTopMostLayer(layersArr);
  if (topMostLayer) return topMostLayer[0].node.current === node;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode.node.current === node;
}
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0) return false;
  const target = e.target;
  if (!isElement(target)) return false;
  const ownerDocument = getOwnerDocument(target);
  const isValid = ownerDocument.documentElement.contains(target) && !isOrContainsTarget(node, target);
  return isValid;
}
function createWrappedEvent(e) {
  const capturedCurrentTarget = e.currentTarget;
  const capturedTarget = e.target;
  let newEvent;
  if (e instanceof PointerEvent) {
    newEvent = new PointerEvent(e.type, e);
  } else {
    newEvent = new PointerEvent("pointerdown", e);
  }
  let isPrevented = false;
  const wrappedEvent = new Proxy(newEvent, {
    get: (target, prop) => {
      if (prop === "currentTarget") {
        return capturedCurrentTarget;
      }
      if (prop === "target") {
        return capturedTarget;
      }
      if (prop === "preventDefault") {
        return () => {
          isPrevented = true;
          if (typeof target.preventDefault === "function") {
            target.preventDefault();
          }
        };
      }
      if (prop === "defaultPrevented") {
        return isPrevented;
      }
      if (prop in target) {
        return target[prop];
      }
      return e[prop];
    }
  });
  return wrappedEvent;
}
function Dismissible_layer($$payload, $$props) {
  push();
  let {
    interactOutsideBehavior = "close",
    onInteractOutside = noop,
    onFocusOutside = noop,
    id,
    children,
    enabled,
    isValidEvent: isValidEvent2 = () => false
  } = $$props;
  const dismissibleLayerState = useDismissibleLayer({
    id: box.with(() => id),
    interactOutsideBehavior: box.with(() => interactOutsideBehavior),
    onInteractOutside: box.with(() => onInteractOutside),
    enabled: box.with(() => enabled),
    onFocusOutside: box.with(() => onFocusOutside),
    isValidEvent: box.with(() => isValidEvent2)
  });
  children?.($$payload, { props: dismissibleLayerState.props });
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
class EscapeLayerState {
  #onEscapeProp;
  #behaviorType;
  #enabled;
  constructor(props) {
    this.#behaviorType = props.escapeKeydownBehavior;
    this.#onEscapeProp = props.onEscapeKeydown;
    this.#enabled = props.enabled;
  }
  #addEventListener = () => {
    return addEventListener(document, "keydown", this.#onkeydown, { passive: false });
  };
  #onkeydown = (e) => {
    if (e.key !== ESCAPE || !isResponsibleEscapeLayer(this)) return;
    const clonedEvent = new KeyboardEvent(e.type, e);
    e.preventDefault();
    const behaviorType = this.#behaviorType.current;
    if (behaviorType !== "close" && behaviorType !== "defer-otherwise-close") return;
    this.#onEscapeProp.current(clonedEvent);
  };
}
function useEscapeLayer(props) {
  return new EscapeLayerState(props);
}
function isResponsibleEscapeLayer(instance) {
  const layersArr = [...globalThis.bitsEscapeLayers];
  const topMostLayer = layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
  if (topMostLayer) return topMostLayer[0] === instance;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode === instance;
}
function Escape_layer($$payload, $$props) {
  push();
  let {
    escapeKeydownBehavior = "close",
    onEscapeKeydown = noop,
    children,
    enabled
  } = $$props;
  useEscapeLayer({
    escapeKeydownBehavior: box.with(() => escapeKeydownBehavior),
    onEscapeKeydown: box.with(() => onEscapeKeydown),
    enabled: box.with(() => enabled)
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function createFocusScopeAPI() {
  let paused = false;
  return {
    id: useId(),
    get paused() {
      return paused;
    },
    pause() {
      paused = true;
    },
    resume() {
      paused = false;
    }
  };
}
function focus(element2, { select = false } = {}) {
  if (!(element2 && element2.focus))
    return;
  const previouslyFocusedElement = document.activeElement;
  element2.focus({ preventScroll: true });
  if (element2 !== previouslyFocusedElement && isSelectableInput(element2) && select) {
    element2.select();
  }
}
function findVisible(elements, container) {
  for (const element2 of elements) {
    if (!isElementHidden(element2, container))
      return element2;
  }
}
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    // eslint-disable-next-line ts/no-explicit-any
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function useFocusScope({
  id,
  loop,
  enabled,
  onOpenAutoFocus,
  onCloseAutoFocus,
  forceMount
}) {
  const focusScope = createFocusScopeAPI();
  const ref = box(null);
  useRefById({ id, ref, deps: () => enabled.current });
  function handleKeydown(e) {
    if (!enabled.current) return;
    if (!loop.current && !enabled.current) return;
    if (focusScope.paused) return;
    const isTabKey = e.key === TAB && !e.ctrlKey && !e.altKey && !e.metaKey;
    const focusedElement = document.activeElement;
    if (!(isTabKey && focusedElement)) return;
    const container = ref.current;
    if (!container) return;
    const [first, last] = getTabbableEdges(container);
    const hasTabbableElementsInside = first && last;
    if (!hasTabbableElementsInside) {
      if (focusedElement === container) {
        e.preventDefault();
      }
    } else {
      if (!e.shiftKey && focusedElement === last) {
        e.preventDefault();
        if (loop.current) focus(first, { select: true });
      } else if (e.shiftKey && focusedElement === first) {
        e.preventDefault();
        if (loop.current) focus(last, { select: true });
      }
    }
  }
  const props = (() => ({
    id: id.current,
    tabindex: -1,
    onkeydown: handleKeydown
  }))();
  return {
    get props() {
      return props;
    }
  };
}
function Focus_scope($$payload, $$props) {
  push();
  let {
    id,
    trapFocus = false,
    loop = false,
    onCloseAutoFocus = noop,
    onOpenAutoFocus = noop,
    focusScope,
    forceMount = false
  } = $$props;
  const focusScopeState = useFocusScope({
    enabled: box.with(() => trapFocus),
    loop: box.with(() => loop),
    onCloseAutoFocus: box.with(() => onCloseAutoFocus),
    onOpenAutoFocus: box.with(() => onOpenAutoFocus),
    id: box.with(() => id),
    forceMount: box.with(() => forceMount)
  });
  focusScope?.($$payload, { props: focusScopeState.props });
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
class TextSelectionLayerState {
  #id;
  #onPointerDownProp;
  #onPointerUpProp;
  #enabled;
  #unsubSelectionLock = noop;
  #ref = box(null);
  constructor(props) {
    this.#id = props.id;
    this.#enabled = props.preventOverflowTextSelection;
    this.#onPointerDownProp = props.onPointerDown;
    this.#onPointerUpProp = props.onPointerUp;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.#enabled.current
    });
  }
  #addEventListeners() {
    return executeCallbacks(addEventListener(document, "pointerdown", this.#pointerdown), addEventListener(document, "pointerup", composeHandlers(this.#resetSelectionLock, this.#onPointerUpProp)));
  }
  #pointerdown = (e) => {
    const node = this.#ref.current;
    const target = e.target;
    if (!isHTMLElement(node) || !isHTMLElement(target) || !this.#enabled.current) return;
    if (!isHighestLayer(this) || !isOrContainsTarget(node, target)) return;
    this.#onPointerDownProp.current(e);
    if (e.defaultPrevented) return;
    this.#unsubSelectionLock = preventTextSelectionOverflow(node);
  };
  #resetSelectionLock = () => {
    this.#unsubSelectionLock();
    this.#unsubSelectionLock = noop;
  };
}
function useTextSelectionLayer(props) {
  return new TextSelectionLayerState(props);
}
const getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
function preventTextSelectionOverflow(node) {
  const body = document.body;
  const originalBodyUserSelect = getUserSelect(body);
  const originalNodeUserSelect = getUserSelect(node);
  setUserSelect(body, "none");
  setUserSelect(node, "text");
  return () => {
    setUserSelect(body, originalBodyUserSelect);
    setUserSelect(node, originalNodeUserSelect);
  };
}
function setUserSelect(node, value) {
  node.style.userSelect = value;
  node.style.webkitUserSelect = value;
}
function isHighestLayer(instance) {
  const layersArr = [...globalThis.bitsTextSelectionLayers];
  if (!layersArr.length) return false;
  const highestLayer = layersArr.at(-1);
  if (!highestLayer) return false;
  return highestLayer[0] === instance;
}
function Text_selection_layer($$payload, $$props) {
  push();
  let {
    preventOverflowTextSelection = true,
    onPointerDown = noop,
    onPointerUp = noop,
    id,
    children,
    enabled
  } = $$props;
  useTextSelectionLayer({
    id: box.with(() => id),
    preventOverflowTextSelection: box.with(() => preventOverflowTextSelection),
    onPointerDown: box.with(() => onPointerDown),
    onPointerUp: box.with(() => onPointerUp),
    enabled: box.with(() => enabled)
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
const SvelteMap = globalThis.Map;
function createSharedHook(factory) {
  let state = void 0;
  return (...args) => {
    return state;
  };
}
const useBodyLockStackCount = createSharedHook();
function useBodyScrollLock(initialState, restoreScrollDelay = () => null) {
  const id = useId();
  const countState = useBodyLockStackCount();
  restoreScrollDelay();
  countState.map.set(id, initialState ?? false);
  const locked = box.with(() => countState.map.get(id) ?? false, (v) => countState.map.set(id, v));
  return locked;
}
function Scroll_lock($$payload, $$props) {
  push();
  let {
    preventScroll = true,
    restoreScrollDelay = null
  } = $$props;
  useBodyScrollLock(preventScroll, () => restoreScrollDelay);
  pop();
}
function shouldTrapFocus({ forceMount, present, trapFocus, open }) {
  if (forceMount) {
    return open && trapFocus;
  }
  return present && trapFocus && open;
}
function Dialog_overlay$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    forceMount = false,
    child,
    children,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const overlayState = useDialogOverlay({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, overlayState.props);
  {
    let presence = function($$payload2) {
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, {
          props: mergeProps(mergedProps),
          ...overlayState.snippetProps
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div${spread_attributes({ ...mergeProps(mergedProps) })}>`;
        children?.($$payload2, overlayState.snippetProps);
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]-->`;
    };
    Presence_layer($$payload, {
      id,
      present: overlayState.root.open.current || forceMount,
      presence,
      $$slots: { presence: true }
    });
  }
  bind_props($$props, { ref });
  pop();
}
function Dialog_trigger($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    child,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useDialogTrigger({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, triggerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function isValidIndex(index, arr) {
  return index >= 0 && index < arr.length;
}
function next(array, index, loop = true) {
  if (array.length === 0 || index < 0 || index >= array.length) {
    return void 0;
  }
  if (array.length === 1 && index === 0) {
    return array[0];
  }
  if (index === array.length - 1) {
    return loop ? array[0] : void 0;
  }
  return array[index + 1];
}
function prev(array, index, loop = true) {
  if (array.length === 0 || index < 0 || index >= array.length) {
    return void 0;
  }
  if (array.length === 1 && index === 0) {
    return array[0];
  }
  if (index === 0) {
    return loop ? array[array.length - 1] : void 0;
  }
  return array[index - 1];
}
function forward(array, index, increment, loop = true) {
  if (array.length === 0 || index < 0 || index >= array.length) {
    return void 0;
  }
  let targetIndex = index + increment;
  if (loop) {
    targetIndex = (targetIndex % array.length + array.length) % array.length;
  } else {
    targetIndex = Math.max(0, Math.min(targetIndex, array.length - 1));
  }
  return array[targetIndex];
}
function backward(array, index, decrement, loop = true) {
  if (array.length === 0 || index < 0 || index >= array.length) {
    return void 0;
  }
  let targetIndex = index - decrement;
  if (loop) {
    targetIndex = (targetIndex % array.length + array.length) % array.length;
  } else {
    targetIndex = Math.max(0, Math.min(targetIndex, array.length - 1));
  }
  return array[targetIndex];
}
function getNextMatch(values, search, currentMatch) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch)
    wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
  const nextMatch = wrappedValues.find((value) => value?.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
  return nextMatch !== currentMatch ? nextMatch : void 0;
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function Visually_hidden($$payload, $$props) {
  push();
  let {
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const style = {
    position: "absolute",
    border: 0,
    width: "1px",
    display: "inline-block",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal"
  };
  const mergedProps = mergeProps(restProps, { style });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></span>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function get(valueOrGetValue) {
  return typeof valueOrGetValue === "function" ? valueOrGetValue() : valueOrGetValue;
}
function getDPR(element2) {
  if (typeof window === "undefined") return 1;
  const win = element2.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element2, value) {
  const dpr = getDPR(element2);
  return Math.round(value * dpr) / dpr;
}
function useFloating(options) {
  get(options.open) ?? true;
  const middlewareOption = get(options.middleware);
  const transformOption = get(options.transform) ?? true;
  const placementOption = get(options.placement) ?? "bottom";
  const strategyOption = get(options.strategy) ?? "absolute";
  const reference = options.reference;
  let x = 0;
  let y = 0;
  const floating = box(null);
  let strategy = strategyOption;
  let placement = placementOption;
  let middlewareData = {};
  let isPositioned = false;
  const floatingStyles = (() => {
    const initialStyles = { position: strategy, left: "0", top: "0" };
    if (!floating.current) {
      return initialStyles;
    }
    const xVal = roundByDPR(floating.current, x);
    const yVal = roundByDPR(floating.current, y);
    if (transformOption) {
      return {
        ...initialStyles,
        transform: `translate(${xVal}px, ${yVal}px)`,
        ...getDPR(floating.current) >= 1.5 && { willChange: "transform" }
      };
    }
    return {
      position: strategy,
      left: `${xVal}px`,
      top: `${yVal}px`
    };
  })();
  function update() {
    if (reference.current === null || floating.current === null) return;
    computePosition(reference.current, floating.current, {
      middleware: middlewareOption,
      placement: placementOption,
      strategy: strategyOption
    }).then((position) => {
      x = position.x;
      y = position.y;
      strategy = position.strategy;
      placement = position.placement;
      middlewareData = position.middlewareData;
      isPositioned = true;
    });
  }
  return {
    floating,
    reference,
    get strategy() {
      return strategy;
    },
    get placement() {
      return placement;
    },
    get middlewareData() {
      return middlewareData;
    },
    get isPositioned() {
      return isPositioned;
    },
    get floatingStyles() {
      return floatingStyles;
    },
    get update() {
      return update;
    }
  };
}
const OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
class FloatingRootState {
  anchorNode = box(null);
  customAnchorNode = box(null);
  triggerNode = box(null);
  constructor() {
  }
}
class FloatingContentState {
  // state
  root;
  // nodes
  contentRef = box(null);
  wrapperRef = box(null);
  arrowRef = box(null);
  // ids
  arrowId = box(useId());
  id;
  wrapperId;
  style;
  #transformedStyle = once(() => {
    if (typeof this.style === "string") return cssToStyleObj(this.style);
    if (!this.style) return {};
  });
  #dir;
  #side;
  #sideOffset;
  #align;
  #alignOffset;
  #arrowPadding;
  #avoidCollisions;
  #collisionBoundary;
  #collisionPadding;
  #sticky;
  #hideWhenDetached;
  #strategy;
  #updatePositionStrategy = void 0;
  onPlaced;
  enabled;
  #arrowSize = new ElementSize(() => this.arrowRef.current ?? void 0);
  #arrowWidth = once(() => this.#arrowSize?.width ?? 0);
  #arrowHeight = once(() => this.#arrowSize?.height ?? 0);
  #desiredPlacement = once(() => this.#side?.current + (this.#align.current !== "center" ? `-${this.#align.current}` : ""));
  #boundary = once(() => Array.isArray(this.#collisionBoundary.current) ? this.#collisionBoundary.current : [this.#collisionBoundary.current]);
  #hasExplicitBoundaries = once(() => this.#boundary().length > 0);
  get hasExplicitBoundaries() {
    return this.#hasExplicitBoundaries();
  }
  #detectOverflowOptions = once(() => ({
    padding: this.#collisionPadding.current,
    boundary: this.#boundary().filter(isNotNull),
    altBoundary: this.hasExplicitBoundaries
  }));
  get detectOverflowOptions() {
    return this.#detectOverflowOptions();
  }
  #availableWidth = void 0;
  #availableHeight = void 0;
  #anchorWidth = void 0;
  #anchorHeight = void 0;
  #middleware = once(() => [
    offset({
      mainAxis: this.#sideOffset.current + this.#arrowHeight(),
      alignmentAxis: this.#alignOffset.current
    }),
    this.#avoidCollisions.current && shift({
      mainAxis: true,
      crossAxis: false,
      limiter: this.#sticky.current === "partial" ? limitShift() : void 0,
      ...this.detectOverflowOptions
    }),
    this.#avoidCollisions.current && flip({ ...this.detectOverflowOptions }),
    size({
      ...this.detectOverflowOptions,
      apply: ({ rects, availableWidth, availableHeight }) => {
        const { width: anchorWidth, height: anchorHeight } = rects.reference;
        this.#availableWidth = availableWidth;
        this.#availableHeight = availableHeight;
        this.#anchorWidth = anchorWidth;
        this.#anchorHeight = anchorHeight;
      }
    }),
    this.arrowRef.current && arrow({
      element: this.arrowRef.current,
      padding: this.#arrowPadding.current
    }),
    transformOrigin({
      arrowWidth: this.#arrowWidth(),
      arrowHeight: this.#arrowHeight()
    }),
    this.#hideWhenDetached.current && hide({
      strategy: "referenceHidden",
      ...this.detectOverflowOptions
    })
  ].filter(Boolean));
  get middleware() {
    return this.#middleware();
  }
  floating;
  #placedSide = once(() => getSideFromPlacement(this.floating.placement));
  get placedSide() {
    return this.#placedSide();
  }
  #placedAlign = once(() => getAlignFromPlacement(this.floating.placement));
  get placedAlign() {
    return this.#placedAlign();
  }
  #arrowX = once(() => this.floating.middlewareData.arrow?.x ?? 0);
  get arrowX() {
    return this.#arrowX();
  }
  #arrowY = once(() => this.floating.middlewareData.arrow?.y ?? 0);
  get arrowY() {
    return this.#arrowY();
  }
  #cannotCenterArrow = once(() => this.floating.middlewareData.arrow?.centerOffset !== 0);
  get cannotCenterArrow() {
    return this.#cannotCenterArrow();
  }
  contentZIndex;
  #arrowBaseSide = once(() => OPPOSITE_SIDE[this.placedSide]);
  get arrowBaseSide() {
    return this.#arrowBaseSide();
  }
  #wrapperProps = once(() => ({
    id: this.wrapperId.current,
    "data-bits-floating-content-wrapper": "",
    style: {
      ...this.floating.floatingStyles,
      // keep off page when measuring
      transform: this.floating.isPositioned ? this.floating.floatingStyles.transform : "translate(0, -200%)",
      minWidth: "max-content",
      zIndex: this.contentZIndex,
      "--bits-floating-transform-origin": `${this.floating.middlewareData.transformOrigin?.x} ${this.floating.middlewareData.transformOrigin?.y}`,
      "--bits-floating-available-width": `${this.#availableWidth}px`,
      "--bits-floating-available-height": `${this.#availableHeight}px`,
      "--bits-floating-anchor-width": `${this.#anchorWidth}px`,
      "--bits-floating-anchor-height": `${this.#anchorHeight}px`,
      // hide the content if using the hide middleware and should be hidden
      ...this.floating.middlewareData.hide?.referenceHidden && {
        visibility: "hidden",
        "pointer-events": "none"
      },
      ...this.#transformedStyle()
    },
    // Floating UI calculates logical alignment based the `dir` attribute
    dir: this.#dir.current
  }));
  get wrapperProps() {
    return this.#wrapperProps();
  }
  #props = once(() => ({
    "data-side": this.placedSide,
    "data-align": this.placedAlign,
    style: styleToString({
      ...this.#transformedStyle()
      // if the FloatingContent hasn't been placed yet (not all measurements done)
    })
  }));
  get props() {
    return this.#props();
  }
  #arrowStyle = once(() => ({
    position: "absolute",
    left: this.arrowX ? `${this.arrowX}px` : void 0,
    top: this.arrowY ? `${this.arrowY}px` : void 0,
    [this.arrowBaseSide]: 0,
    "transform-origin": {
      top: "",
      right: "0 0",
      bottom: "center 0",
      left: "100% 0"
    }[this.placedSide],
    transform: {
      top: "translateY(100%)",
      right: "translateY(50%) rotate(90deg) translateX(-50%)",
      bottom: "rotate(180deg)",
      left: "translateY(50%) rotate(-90deg) translateX(50%)"
    }[this.placedSide],
    visibility: this.cannotCenterArrow ? "hidden" : void 0
  }));
  get arrowStyle() {
    return this.#arrowStyle();
  }
  constructor(props, root) {
    this.id = props.id;
    this.#side = props.side;
    this.#sideOffset = props.sideOffset;
    this.#align = props.align;
    this.#alignOffset = props.alignOffset;
    this.#arrowPadding = props.arrowPadding;
    this.#avoidCollisions = props.avoidCollisions;
    this.#collisionBoundary = props.collisionBoundary;
    this.#collisionPadding = props.collisionPadding;
    this.#sticky = props.sticky;
    this.#hideWhenDetached = props.hideWhenDetached;
    this.#updatePositionStrategy = props.updatePositionStrategy;
    this.onPlaced = props.onPlaced;
    this.#strategy = props.strategy;
    this.#dir = props.dir;
    this.style = props.style;
    this.root = root;
    this.enabled = props.enabled;
    this.wrapperId = props.wrapperId;
    if (props.customAnchor) {
      this.root.customAnchorNode.current = props.customAnchor.current;
    }
    useRefById({
      id: this.wrapperId,
      ref: this.wrapperRef,
      deps: () => this.enabled.current
    });
    useRefById({
      id: this.id,
      ref: this.contentRef,
      deps: () => this.enabled.current
    });
    this.floating = useFloating({
      strategy: () => this.#strategy.current,
      placement: () => this.#desiredPlacement(),
      middleware: () => this.middleware,
      reference: this.root.anchorNode,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          animationFrame: this.#updatePositionStrategy?.current === "always"
        });
        return cleanup;
      },
      open: () => this.enabled.current
    });
  }
}
class FloatingAnchorState {
  ref = box(null);
  constructor(props, root) {
    if (props.virtualEl && props.virtualEl.current) {
      root.triggerNode = box.from(props.virtualEl.current);
    } else {
      useRefById({
        id: props.id,
        ref: this.ref,
        onRefChange: (node) => {
          root.triggerNode.current = node;
        }
      });
    }
  }
}
const [
  setFloatingRootContext,
  getFloatingRootContext
] = createContext("Floating.Root");
const [
  setFloatingContentContext,
  getFloatingContentContext
] = createContext("Floating.Content");
function useFloatingRootState() {
  return setFloatingRootContext(new FloatingRootState());
}
function useFloatingContentState(props) {
  return setFloatingContentContext(new FloatingContentState(props, getFloatingRootContext()));
}
function useFloatingAnchorState(props) {
  return new FloatingAnchorState(props, getFloatingRootContext());
}
function transformOrigin(options) {
  return {
    name: "transformOrigin",
    options,
    fn(data) {
      const { placement, rects, middlewareData } = data;
      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
      const isArrowHidden = cannotCenterArrow;
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
      const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
      const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
      const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
      let x = "";
      let y = "";
      if (placedSide === "bottom") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${-arrowHeight}px`;
      } else if (placedSide === "top") {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
        y = `${rects.floating.height + arrowHeight}px`;
      } else if (placedSide === "right") {
        x = `${-arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      } else if (placedSide === "left") {
        x = `${rects.floating.width + arrowHeight}px`;
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
      }
      return { data: { x, y } };
    }
  };
}
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
function getSideFromPlacement(placement) {
  return getSideAndAlignFromPlacement(placement)[0];
}
function getAlignFromPlacement(placement) {
  return getSideAndAlignFromPlacement(placement)[1];
}
function Floating_layer($$payload, $$props) {
  push();
  let { children } = $$props;
  useFloatingRootState();
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function boxAutoReset(defaultValue, afterMs = 1e4) {
  let timeout = null;
  let value = defaultValue;
  function resetAfter() {
    return setTimeout(
      () => {
        value = defaultValue;
      },
      afterMs
    );
  }
  return box.with(() => value, (v) => {
    value = v;
    if (timeout) clearTimeout(timeout);
    timeout = resetAfter();
  });
}
function useDOMTypeahead(opts) {
  const search = boxAutoReset("", 1e3);
  const onMatch = opts?.onMatch ?? ((node) => node.focus());
  const getCurrentItem = opts?.getCurrentItem ?? (() => document.activeElement);
  function handleTypeaheadSearch(key2, candidates) {
    if (!candidates.length) return;
    search.current = search.current + key2;
    const currentItem = getCurrentItem();
    const currentMatch = candidates.find((item) => item === currentItem)?.textContent?.trim() ?? "";
    const values = candidates.map((item) => item.textContent?.trim() ?? "");
    const nextMatch = getNextMatch(values, search.current, currentMatch);
    const newItem = candidates.find((item) => item.textContent?.trim() === nextMatch);
    if (newItem) {
      onMatch(newItem);
    }
    return newItem;
  }
  function resetTypeahead() {
    search.current = "";
  }
  return {
    search,
    handleTypeaheadSearch,
    resetTypeahead
  };
}
function useDataTypeahead(opts) {
  const search = boxAutoReset("", 1e3);
  function handleTypeaheadSearch(key2, candidateValues) {
    if (!opts.enabled) return;
    if (!candidateValues.length) return;
    search.current = search.current + key2;
    const currentItem = opts.getCurrentItem();
    const currentMatch = candidateValues.find((item) => item === currentItem) ?? "";
    const values = candidateValues.map((item) => item ?? "");
    const nextMatch = getNextMatch(values, search.current, currentMatch);
    const newItem = candidateValues.find((item) => item === nextMatch);
    if (newItem) {
      opts.onMatch(newItem);
    }
    return newItem;
  }
  function resetTypeahead() {
    search.current = "";
  }
  return {
    search,
    handleTypeaheadSearch,
    resetTypeahead
  };
}
const FIRST_KEYS = [ARROW_DOWN, PAGE_UP, HOME];
const LAST_KEYS = [ARROW_UP, PAGE_DOWN, END];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
class SelectBaseRootState {
  disabled;
  required;
  name;
  loop;
  open;
  scrollAlignment;
  items;
  allowDeselect;
  touchedInput = false;
  inputValue = "";
  inputNode = null;
  contentNode = null;
  triggerNode = null;
  valueId = "";
  highlightedNode = null;
  #highlightedValue = once(() => {
    if (!this.highlightedNode) return null;
    return this.highlightedNode.getAttribute("data-value");
  });
  get highlightedValue() {
    return this.#highlightedValue();
  }
  #highlightedId = once(() => {
    if (!this.highlightedNode) return void 0;
    return this.highlightedNode.id;
  });
  get highlightedId() {
    return this.#highlightedId();
  }
  #highlightedLabel = once(() => {
    if (!this.highlightedNode) return null;
    return this.highlightedNode.getAttribute("data-label");
  });
  get highlightedLabel() {
    return this.#highlightedLabel();
  }
  isUsingKeyboard = false;
  isCombobox = false;
  bitsAttrs;
  triggerPointerDownPos = { x: 0, y: 0 };
  constructor(props) {
    this.disabled = props.disabled;
    this.required = props.required;
    this.name = props.name;
    this.loop = props.loop;
    this.open = props.open;
    this.scrollAlignment = props.scrollAlignment;
    this.isCombobox = props.isCombobox;
    this.items = props.items;
    this.allowDeselect = props.allowDeselect;
    this.bitsAttrs = getSelectBitsAttrs(this);
  }
  setHighlightedNode(node) {
    this.highlightedNode = node;
    if (node) {
      if (this.isUsingKeyboard) {
        node.scrollIntoView({ block: "nearest" });
      }
    }
  }
  getCandidateNodes() {
    const node = this.contentNode;
    if (!node) return [];
    const nodes = Array.from(node.querySelectorAll(`[${this.bitsAttrs.item}]:not([data-disabled])`));
    return nodes;
  }
  setHighlightedToFirstCandidate() {
    this.setHighlightedNode(null);
    const candidateNodes = this.getCandidateNodes();
    if (!candidateNodes.length) return;
    this.setHighlightedNode(candidateNodes[0]);
  }
  getNodeByValue(value) {
    const candidateNodes = this.getCandidateNodes();
    return candidateNodes.find((node) => node.dataset.value === value) ?? null;
  }
  setOpen(open) {
    this.open.current = open;
  }
  toggleOpen() {
    this.open.current = !this.open.current;
  }
  handleOpen() {
    this.setOpen(true);
  }
  handleClose() {
    this.setHighlightedNode(null);
    this.setOpen(false);
  }
  toggleMenu() {
    this.toggleOpen();
  }
}
class SelectSingleRootState extends SelectBaseRootState {
  value;
  isMulti = false;
  #hasValue = once(() => this.value.current !== "");
  get hasValue() {
    return this.#hasValue();
  }
  #currentLabel = once(() => {
    if (!this.items.current.length) return "";
    const match = this.items.current.find((item) => item.value === this.value.current)?.label;
    return match ?? "";
  });
  get currentLabel() {
    return this.#currentLabel();
  }
  #candidateLabels = once(() => {
    if (!this.items.current.length) return [];
    const filteredItems = this.items.current.filter((item) => !item.disabled);
    return filteredItems.map((item) => item.label);
  });
  get candidateLabels() {
    return this.#candidateLabels();
  }
  #dataTypeaheadEnabled = once(() => {
    if (this.isMulti) return false;
    if (this.items.current.length === 0) return false;
    return true;
  });
  get dataTypeaheadEnabled() {
    return this.#dataTypeaheadEnabled();
  }
  constructor(props) {
    super(props);
    this.value = props.value;
  }
  includesItem(itemValue) {
    return this.value.current === itemValue;
  }
  toggleItem(itemValue, itemLabel = itemValue) {
    this.value.current = this.includesItem(itemValue) ? "" : itemValue;
    this.inputValue = itemLabel;
  }
  setInitialHighlightedNode() {
    if (this.highlightedNode && document.contains(this.highlightedNode)) return;
    if (this.value.current !== "") {
      const node = this.getNodeByValue(this.value.current);
      if (node) {
        this.setHighlightedNode(node);
        return;
      }
    }
    const firstCandidate = this.getCandidateNodes()[0];
    if (!firstCandidate) return;
    this.setHighlightedNode(firstCandidate);
  }
}
class SelectMultipleRootState extends SelectBaseRootState {
  value;
  isMulti = true;
  #hasValue = once(() => this.value.current.length > 0);
  get hasValue() {
    return this.#hasValue();
  }
  constructor(props) {
    super(props);
    this.value = props.value;
  }
  includesItem(itemValue) {
    return this.value.current.includes(itemValue);
  }
  toggleItem(itemValue, itemLabel = itemValue) {
    if (this.includesItem(itemValue)) {
      this.value.current = this.value.current.filter((v) => v !== itemValue);
    } else {
      this.value.current = [...this.value.current, itemValue];
    }
    this.inputValue = itemLabel;
  }
  setInitialHighlightedNode() {
    if (this.highlightedNode) return;
    if (this.value.current.length && this.value.current[0] !== "") {
      const node = this.getNodeByValue(this.value.current[0]);
      if (node) {
        this.setHighlightedNode(node);
        return;
      }
    }
    const firstCandidate = this.getCandidateNodes()[0];
    if (!firstCandidate) return;
    this.setHighlightedNode(firstCandidate);
  }
}
class SelectTriggerState {
  #id;
  #ref;
  root;
  #domTypeahead;
  #dataTypeahead;
  constructor(props, root) {
    this.root = root;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.root.triggerNode = node;
      }
    });
    this.#domTypeahead = useDOMTypeahead({
      getCurrentItem: () => this.root.highlightedNode,
      onMatch: (node) => {
        this.root.setHighlightedNode(node);
      }
    });
    this.#dataTypeahead = useDataTypeahead({
      getCurrentItem: () => {
        if (this.root.isMulti) return "";
        return this.root.currentLabel;
      },
      onMatch: (label) => {
        if (this.root.isMulti) return;
        if (!this.root.items.current) return;
        const matchedItem = this.root.items.current.find((item) => item.label === label);
        if (!matchedItem) return;
        this.root.value.current = matchedItem.value;
      },
      enabled: !this.root.isMulti && this.root.dataTypeaheadEnabled
    });
    this.onkeydown = this.onkeydown.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
    this.onclick = this.onclick.bind(this);
  }
  #handleOpen() {
    this.root.open.current = true;
    this.#dataTypeahead.resetTypeahead();
    this.#domTypeahead.resetTypeahead();
  }
  #handlePointerOpen(e) {
    this.#handleOpen();
    this.root.triggerPointerDownPos = {
      x: Math.round(e.pageX),
      y: Math.round(e.pageY)
    };
  }
  onkeydown(e) {
    this.root.isUsingKeyboard = true;
    if (e.key === ARROW_UP || e.key === ARROW_DOWN) e.preventDefault();
    if (!this.root.open.current) {
      if (e.key === ENTER || e.key === SPACE || e.key === ARROW_DOWN || e.key === ARROW_UP) {
        e.preventDefault();
        this.root.handleOpen();
      } else if (!this.root.isMulti && this.root.dataTypeaheadEnabled) {
        this.#dataTypeahead.handleTypeaheadSearch(e.key, this.root.candidateLabels);
        return;
      }
      afterTick(() => {
        if (this.root.hasValue) return;
        const candidateNodes2 = this.root.getCandidateNodes();
        if (!candidateNodes2.length) return;
        if (e.key === ARROW_DOWN) {
          const firstCandidate = candidateNodes2[0];
          this.root.setHighlightedNode(firstCandidate);
        } else if (e.key === ARROW_UP) {
          const lastCandidate = candidateNodes2[candidateNodes2.length - 1];
          this.root.setHighlightedNode(lastCandidate);
        }
      });
      return;
    }
    if (e.key === TAB) {
      this.root.handleClose();
      return;
    }
    if ((e.key === ENTER || e.key === SPACE) && !e.isComposing) {
      e.preventDefault();
      const highlightedValue = this.root.highlightedValue;
      const isCurrentSelectedValue = highlightedValue === this.root.value.current;
      if (!this.root.allowDeselect.current && isCurrentSelectedValue && !this.root.isMulti) {
        this.root.handleClose();
        return;
      }
      if (highlightedValue !== null) {
        this.root.toggleItem(highlightedValue, this.root.highlightedLabel ?? void 0);
      }
      if (!this.root.isMulti && !isCurrentSelectedValue) {
        this.root.handleClose();
      }
    }
    if (e.key === ARROW_UP && e.altKey) {
      this.root.handleClose();
    }
    if (FIRST_LAST_KEYS.includes(e.key)) {
      e.preventDefault();
      const candidateNodes2 = this.root.getCandidateNodes();
      const currHighlightedNode = this.root.highlightedNode;
      const currIndex = currHighlightedNode ? candidateNodes2.indexOf(currHighlightedNode) : -1;
      const loop = this.root.loop.current;
      let nextItem;
      if (e.key === ARROW_DOWN) {
        nextItem = next(candidateNodes2, currIndex, loop);
      } else if (e.key === ARROW_UP) {
        nextItem = prev(candidateNodes2, currIndex, loop);
      } else if (e.key === PAGE_DOWN) {
        nextItem = forward(candidateNodes2, currIndex, 10, loop);
      } else if (e.key === PAGE_UP) {
        nextItem = backward(candidateNodes2, currIndex, 10, loop);
      } else if (e.key === HOME) {
        nextItem = candidateNodes2[0];
      } else if (e.key === END) {
        nextItem = candidateNodes2[candidateNodes2.length - 1];
      }
      if (!nextItem) return;
      this.root.setHighlightedNode(nextItem);
      return;
    }
    const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
    const isCharacterKey = e.key.length === 1;
    if (e.code === "Space") return;
    const candidateNodes = this.root.getCandidateNodes();
    if (e.key === TAB) return;
    if (!isModifierKey && isCharacterKey) {
      this.#domTypeahead.handleTypeaheadSearch(e.key, candidateNodes);
      return;
    }
    if (!this.root.highlightedNode) {
      this.root.setHighlightedToFirstCandidate();
    }
  }
  onclick(e) {
    const currTarget = e.currentTarget;
    currTarget.focus();
  }
  /**
   * `pointerdown` fires before the `focus` event, so we can prevent the default
   * behavior of focusing the button and keep focus on the input.
   */
  onpointerdown = (e) => {
    if (this.root.disabled.current) return;
    if (e.pointerType === "touch") return e.preventDefault();
    const target = e.target;
    if (target?.hasPointerCapture(e.pointerId)) {
      target?.releasePointerCapture(e.pointerId);
    }
    if (e.button === 0 && e.ctrlKey === false) {
      if (this.root.open.current === false) {
        this.#handlePointerOpen(e);
        e.preventDefault();
      } else {
        this.root.handleClose();
      }
    }
  };
  onpointerup = (e) => {
    e.preventDefault();
    if (e.pointerType === "touch") {
      this.#handlePointerOpen(e);
    }
  };
  #props = once(() => ({
    id: this.#id.current,
    disabled: this.root.disabled.current ? true : void 0,
    "aria-haspopup": "listbox",
    "data-state": getDataOpenClosed(this.root.open.current),
    "data-disabled": getDataDisabled(this.root.disabled.current),
    "data-placeholder": this.root.hasValue ? void 0 : "",
    [this.root.bitsAttrs.trigger]: "",
    onpointerdown: this.onpointerdown,
    onkeydown: this.onkeydown,
    onclick: this.onclick,
    onpointerup: this.onpointerup
  }));
  get props() {
    return this.#props();
  }
}
class SelectContentState {
  id;
  ref;
  viewportNode = null;
  root;
  isPositioned = false;
  constructor(props, root) {
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({
      id: this.id,
      ref: this.ref,
      onRefChange: (node) => {
        this.root.contentNode = node;
      },
      deps: () => this.root.open.current
    });
    this.onpointermove = this.onpointermove.bind(this);
    this.handleInteractOutside = this.handleInteractOutside.bind(this);
  }
  onpointermove(_) {
    this.root.isUsingKeyboard = false;
  }
  #styles = once(() => {
    if (this.root.isCombobox) {
      return {
        "--bits-combobox-content-transform-origin": "var(--bits-floating-transform-origin)",
        "--bits-combobox-content-available-width": "var(--bits-floating-available-width)",
        "--bits-combobox-content-available-height": "var(--bits-floating-available-height)",
        "--bits-combobox-anchor-width": "var(--bits-floating-anchor-width)",
        "--bits-combobox-anchor-height": "var(--bits-floating-anchor-height)"
      };
    } else {
      return {
        "--bits-select-content-transform-origin": "var(--bits-floating-transform-origin)",
        "--bits-select-content-available-width": "var(--bits-floating-available-width)",
        "--bits-select-content-available-height": "var(--bits-floating-available-height)",
        "--bits-select-anchor-width": "var(--bits-floating-anchor-width)",
        "--bits-select-anchor-height": "var(--bits-floating-anchor-height)"
      };
    }
  });
  handleInteractOutside(e) {
    if (e.target === this.root.triggerNode || e.target === this.root.inputNode) {
      e.preventDefault();
    }
  }
  #snippetProps = once(() => ({ open: this.root.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #props = once(() => ({
    id: this.id.current,
    role: "listbox",
    "data-state": getDataOpenClosed(this.root.open.current),
    [this.root.bitsAttrs.content]: "",
    style: {
      display: "flex",
      flexDirection: "column",
      outline: "none",
      boxSizing: "border-box",
      pointerEvents: "auto",
      ...this.#styles()
    },
    onpointermove: this.onpointermove
  }));
  get props() {
    return this.#props();
  }
}
class SelectItemState {
  #id;
  #ref;
  root;
  value;
  label;
  onHighlight;
  onUnhighlight;
  disabled;
  #isSelected = once(() => this.root.includesItem(this.value.current));
  get isSelected() {
    return this.#isSelected();
  }
  #isHighlighted = once(() => this.root.highlightedValue === this.value.current);
  get isHighlighted() {
    return this.#isHighlighted();
  }
  prevHighlighted = new Previous(() => this.isHighlighted);
  textId = "";
  mounted = false;
  constructor(props, root) {
    this.root = root;
    this.value = props.value;
    this.disabled = props.disabled;
    this.label = props.label;
    this.onHighlight = props.onHighlight;
    this.onUnhighlight = props.onUnhighlight;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({ id: this.#id, ref: this.#ref });
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
  }
  #snippetProps = once(() => ({
    selected: this.isSelected,
    highlighted: this.isHighlighted
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
  onpointerdown(e) {
    e.preventDefault();
  }
  /**
   * Using `pointerup` instead of `click` allows power users to pointerdown
   * the trigger, then release pointerup on an item to select it vs having to do
   * multiple clicks.
   */
  onpointerup(e) {
    if (e.defaultPrevented) return;
    e.preventDefault();
    if (this.disabled.current) return;
    const isCurrentSelectedValue = this.value.current === this.root.value.current;
    if (!this.root.allowDeselect.current && isCurrentSelectedValue && !this.root.isMulti) {
      this.root.handleClose();
      return;
    }
    this.root.toggleItem(this.value.current, this.label.current);
    if (!this.root.isMulti && !isCurrentSelectedValue) {
      this.root.handleClose();
    }
  }
  onpointermove(_) {
    if (this.root.highlightedNode !== this.#ref.current) {
      this.root.setHighlightedNode(this.#ref.current);
    }
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "option",
    "aria-selected": this.root.includesItem(this.value.current) ? "true" : void 0,
    "data-value": this.value.current,
    "data-disabled": getDataDisabled(this.disabled.current),
    "data-highlighted": this.root.highlightedValue === this.value.current ? "" : void 0,
    "data-selected": this.root.includesItem(this.value.current) ? "" : void 0,
    "data-label": this.label.current,
    [this.root.bitsAttrs.item]: "",
    onpointermove: this.onpointermove,
    onpointerdown: this.onpointerdown,
    onpointerup: this.onpointerup
  }));
  get props() {
    return this.#props();
  }
}
class SelectGroupState {
  #id;
  #ref;
  root;
  labelNode = null;
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.root = root;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "group",
    [this.root.bitsAttrs.group]: "",
    "aria-labelledby": this.labelNode?.id ?? void 0
  }));
  get props() {
    return this.#props();
  }
}
class SelectGroupHeadingState {
  #id;
  #ref;
  group;
  constructor(props, group2) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.group = group2;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        group2.labelNode = node;
      }
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    [this.group.root.bitsAttrs["group-label"]]: ""
  }));
  get props() {
    return this.#props();
  }
}
class SelectHiddenInputState {
  #value;
  root;
  #shouldRender = once(() => this.root.name.current !== "");
  get shouldRender() {
    return this.#shouldRender();
  }
  constructor(props, root) {
    this.root = root;
    this.#value = props.value;
    this.onfocus = this.onfocus.bind(this);
  }
  onfocus(e) {
    e.preventDefault();
    if (!this.root.isCombobox) {
      this.root.triggerNode?.focus();
    } else {
      this.root.inputNode?.focus();
    }
  }
  #props = once(() => ({
    disabled: getDisabled(this.root.disabled.current),
    required: getRequired(this.root.required.current),
    name: this.root.name.current,
    value: this.#value.current,
    style: styleToString(srOnlyStyles),
    tabindex: -1,
    onfocus: this.onfocus
  }));
  get props() {
    return this.#props();
  }
}
class SelectViewportState {
  #id;
  #ref;
  root;
  content;
  prevScrollTop = 0;
  constructor(props, content) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.content = content;
    this.root = content.root;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.content.viewportNode = node;
      },
      deps: () => this.root.open.current
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "presentation",
    [this.root.bitsAttrs.viewport]: "",
    style: {
      // we use position: 'relative' here on the `viewport` so that when we call
      // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
      // (independent of the scrollUpButton).
      position: "relative",
      flex: 1,
      overflow: "auto"
    }
  }));
  get props() {
    return this.#props();
  }
}
class SelectScrollButtonImplState {
  id;
  ref;
  content;
  root;
  autoScrollTimer = null;
  onAutoScroll = noop;
  mounted;
  constructor(props, content) {
    this.ref = props.ref;
    this.id = props.id;
    this.mounted = props.mounted;
    this.content = content;
    this.root = content.root;
    useRefById({
      id: this.id,
      ref: this.ref,
      deps: () => this.mounted.current
    });
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
    this.onpointerleave = this.onpointerleave.bind(this);
  }
  clearAutoScrollTimer() {
    if (this.autoScrollTimer === null) return;
    window.clearInterval(this.autoScrollTimer);
    this.autoScrollTimer = null;
  }
  onpointerdown(_) {
    if (this.autoScrollTimer !== null) return;
    this.autoScrollTimer = window.setInterval(
      () => {
        this.onAutoScroll();
      },
      50
    );
  }
  onpointermove(_) {
    if (this.autoScrollTimer !== null) return;
    this.autoScrollTimer = window.setInterval(
      () => {
        this.onAutoScroll();
      },
      50
    );
  }
  onpointerleave(_) {
    this.clearAutoScrollTimer();
  }
  #props = once(() => ({
    id: this.id.current,
    "aria-hidden": getAriaHidden(true),
    style: { flexShrink: 0 },
    onpointerdown: this.onpointerdown,
    onpointermove: this.onpointermove,
    onpointerleave: this.onpointerleave
  }));
  get props() {
    return this.#props();
  }
}
class SelectScrollDownButtonState {
  state;
  content;
  root;
  canScrollDown = false;
  constructor(state) {
    this.state = state;
    this.content = state.content;
    this.root = state.root;
    this.state.onAutoScroll = this.handleAutoScroll;
  }
  handleAutoScroll = () => {
    afterTick(() => {
      const viewport = this.content.viewportNode;
      const selectedItem = this.root.highlightedNode;
      if (!viewport || !selectedItem) return;
      viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
    });
  };
  #props = once(() => ({
    ...this.state.props,
    [this.root.bitsAttrs["scroll-down-button"]]: ""
  }));
  get props() {
    return this.#props();
  }
}
class SelectScrollUpButtonState {
  state;
  content;
  root;
  canScrollUp = false;
  constructor(state) {
    this.state = state;
    this.content = state.content;
    this.root = state.root;
    this.state.onAutoScroll = this.handleAutoScroll;
  }
  handleAutoScroll = () => {
    afterTick(() => {
      const viewport = this.content.viewportNode;
      const selectedItem = this.root.highlightedNode;
      if (!viewport || !selectedItem) return;
      viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
    });
  };
  #props = once(() => ({
    ...this.state.props,
    [this.root.bitsAttrs["scroll-up-button"]]: ""
  }));
  get props() {
    return this.#props();
  }
}
const [setSelectRootContext, getSelectRootContext] = createContext(["Select.Root", "Combobox.Root"]);
const [setSelectGroupContext, getSelectGroupContext] = createContext(["Select.Group", "Combobox.Group"]);
const [
  setSelectContentContext,
  getSelectContentContext
] = createContext(["Select.Content", "Combobox.Content"]);
function useSelectRoot(props) {
  const { type, ...rest } = props;
  const rootState = type === "single" ? new SelectSingleRootState(rest) : new SelectMultipleRootState(rest);
  return setSelectRootContext(rootState);
}
function useSelectContent(props) {
  return setSelectContentContext(new SelectContentState(props, getSelectRootContext()));
}
function useSelectTrigger(props) {
  return new SelectTriggerState(props, getSelectRootContext());
}
function useSelectItem(props) {
  return new SelectItemState(props, getSelectRootContext());
}
function useSelectViewport(props) {
  return new SelectViewportState(props, getSelectContentContext());
}
function useSelectScrollUpButton(props) {
  return new SelectScrollUpButtonState(new SelectScrollButtonImplState(props, getSelectContentContext()));
}
function useSelectScrollDownButton(props) {
  return new SelectScrollDownButtonState(new SelectScrollButtonImplState(props, getSelectContentContext()));
}
function useSelectGroup(props) {
  return setSelectGroupContext(new SelectGroupState(props, getSelectRootContext()));
}
function useSelectGroupHeading(props) {
  return new SelectGroupHeadingState(props, getSelectGroupContext());
}
function useSelectHiddenInput(props) {
  return new SelectHiddenInputState(props, getSelectRootContext());
}
const selectParts = [
  "trigger",
  "content",
  "item",
  "viewport",
  "scroll-up-button",
  "scroll-down-button",
  "group",
  "group-label",
  "separator",
  "arrow",
  "input",
  "content-wrapper",
  "item-text",
  "value"
];
function getSelectBitsAttrs(root) {
  const isCombobox = root.isCombobox;
  const attrObj = {};
  for (const part of selectParts) {
    attrObj[part] = isCombobox ? `data-combobox-${part}` : `data-select-${part}`;
  }
  return attrObj;
}
function Select_hidden_input($$payload, $$props) {
  push();
  let { value = "" } = $$props;
  const hiddenInputState = useSelectHiddenInput({ value: box.with(() => value) });
  Visually_hidden($$payload, {
    children: ($$payload2) => {
      if (hiddenInputState.shouldRender) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<input${spread_attributes({ ...hiddenInputState.props, value })}>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  bind_props($$props, { value });
  pop();
}
function Floating_layer_anchor($$payload, $$props) {
  push();
  let { id, children, virtualEl } = $$props;
  useFloatingAnchorState({
    id: box.with(() => id),
    virtualEl: box.with(() => virtualEl)
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function Floating_layer_content($$payload, $$props) {
  push();
  let {
    content,
    side = "bottom",
    sideOffset = 0,
    align = "center",
    alignOffset = 0,
    id,
    arrowPadding = 0,
    avoidCollisions = true,
    collisionBoundary = [],
    collisionPadding = 0,
    hideWhenDetached = false,
    onPlaced = () => {
    },
    sticky = "partial",
    updatePositionStrategy = "optimized",
    strategy = "fixed",
    dir = "ltr",
    style = {},
    wrapperId = useId(),
    customAnchor = null
  } = $$props;
  const contentState = useFloatingContentState({
    side: box.with(() => side),
    sideOffset: box.with(() => sideOffset),
    align: box.with(() => align),
    alignOffset: box.with(() => alignOffset),
    id: box.with(() => id),
    arrowPadding: box.with(() => arrowPadding),
    avoidCollisions: box.with(() => avoidCollisions),
    collisionBoundary: box.with(() => collisionBoundary),
    collisionPadding: box.with(() => collisionPadding),
    hideWhenDetached: box.with(() => hideWhenDetached),
    onPlaced: box.with(() => onPlaced),
    sticky: box.with(() => sticky),
    updatePositionStrategy: box.with(() => updatePositionStrategy),
    strategy: box.with(() => strategy),
    dir: box.with(() => dir),
    style: box.with(() => style),
    enabled: box.with(() => false),
    wrapperId: box.with(() => wrapperId),
    customAnchor: box.with(() => customAnchor)
  });
  const mergedProps = mergeProps(contentState.wrapperProps, { style: { pointerEvents: "auto" } });
  content?.($$payload, {
    props: contentState.props,
    wrapperProps: mergedProps
  });
  $$payload.out += `<!---->`;
  pop();
}
function Floating_layer_content_static($$payload, $$props) {
  push();
  let { content, onPlaced } = $$props;
  content?.($$payload, { props: {}, wrapperProps: {} });
  $$payload.out += `<!---->`;
  pop();
}
function Popper_content($$payload, $$props) {
  let {
    content,
    isStatic = false,
    onPlaced,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (isStatic) {
    $$payload.out += "<!--[-->";
    Floating_layer_content_static($$payload, { content, onPlaced });
  } else {
    $$payload.out += "<!--[!-->";
    Floating_layer_content($$payload, spread_props([{ content, onPlaced }, restProps]));
  }
  $$payload.out += `<!--]-->`;
}
function Popper_layer_inner($$payload, $$props) {
  push();
  let {
    popper,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    enabled,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  {
    let content = function($$payload2, { props: floatingProps, wrapperProps }) {
      if (restProps.forceMount && enabled) {
        $$payload2.out += "<!--[-->";
        Scroll_lock($$payload2, { preventScroll });
      } else {
        $$payload2.out += "<!--[!-->";
        if (!restProps.forceMount) {
          $$payload2.out += "<!--[-->";
          Scroll_lock($$payload2, { preventScroll });
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]--> `;
      {
        let focusScope = function($$payload3, { props: focusScopeProps }) {
          Escape_layer($$payload3, {
            onEscapeKeydown,
            escapeKeydownBehavior,
            enabled,
            children: ($$payload4) => {
              {
                let children = function($$payload5, { props: dismissibleProps }) {
                  Text_selection_layer($$payload5, {
                    id,
                    preventOverflowTextSelection,
                    onPointerDown,
                    onPointerUp,
                    enabled,
                    children: ($$payload6) => {
                      popper?.($$payload6, {
                        props: mergeProps(restProps, floatingProps, dismissibleProps, focusScopeProps, { style: { pointerEvents: "auto" } }),
                        wrapperProps
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                };
                Dismissible_layer($$payload4, {
                  id,
                  onInteractOutside,
                  onFocusOutside,
                  interactOutsideBehavior,
                  isValidEvent: isValidEvent2,
                  enabled,
                  children,
                  $$slots: { default: true }
                });
              }
            },
            $$slots: { default: true }
          });
        };
        Focus_scope($$payload2, {
          id,
          onOpenAutoFocus,
          onCloseAutoFocus,
          loop,
          trapFocus: enabled && trapFocus,
          forceMount: restProps.forceMount,
          focusScope,
          $$slots: { focusScope: true }
        });
      }
      $$payload2.out += `<!---->`;
    };
    Popper_content($$payload, {
      isStatic,
      id,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      updatePositionStrategy,
      strategy,
      dir,
      wrapperId,
      style,
      onPlaced,
      customAnchor,
      content,
      $$slots: { content: true }
    });
  }
  pop();
}
function Popper_layer($$payload, $$props) {
  let {
    popper,
    present,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  {
    let presence = function($$payload2, { present: present2 }) {
      Popper_layer_inner($$payload2, spread_props([
        {
          popper,
          onEscapeKeydown,
          escapeKeydownBehavior,
          preventOverflowTextSelection,
          id,
          onPointerDown,
          onPointerUp,
          side,
          sideOffset,
          align,
          alignOffset,
          arrowPadding,
          avoidCollisions,
          collisionBoundary,
          collisionPadding,
          sticky,
          hideWhenDetached,
          updatePositionStrategy,
          strategy,
          dir,
          preventScroll,
          wrapperId,
          style,
          onPlaced,
          customAnchor,
          isStatic,
          enabled: present2.current,
          onInteractOutside,
          onCloseAutoFocus,
          onOpenAutoFocus,
          interactOutsideBehavior,
          loop,
          trapFocus,
          isValidEvent: isValidEvent2,
          onFocusOutside,
          forceMount: false
        },
        restProps
      ]));
    };
    Presence_layer($$payload, spread_props([
      { id, present },
      restProps,
      { presence, $$slots: { presence: true } }
    ]));
  }
}
function Popper_layer_force_mount($$payload, $$props) {
  let {
    popper,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    enabled,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  Popper_layer_inner($$payload, spread_props([
    {
      popper,
      onEscapeKeydown,
      escapeKeydownBehavior,
      preventOverflowTextSelection,
      id,
      onPointerDown,
      onPointerUp,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      updatePositionStrategy,
      strategy,
      dir,
      preventScroll,
      wrapperId,
      style,
      onPlaced,
      customAnchor,
      isStatic,
      enabled,
      onInteractOutside,
      onCloseAutoFocus,
      onOpenAutoFocus,
      interactOutsideBehavior,
      loop,
      trapFocus,
      isValidEvent: isValidEvent2,
      onFocusOutside
    },
    restProps,
    { forceMount: true }
  ]));
}
function Select_content$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    forceMount = false,
    side = "bottom",
    onInteractOutside = noop,
    onEscapeKeydown = noop,
    children,
    child,
    preventScroll = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useSelectContent({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  function handleInteractOutside(e) {
    contentState.handleInteractOutside(e);
    if (e.defaultPrevented) return;
    onInteractOutside(e);
    if (e.defaultPrevented) return;
    contentState.root.handleClose();
  }
  function handleEscapeKeydown(e) {
    onEscapeKeydown(e);
    if (e.defaultPrevented) return;
    contentState.root.handleClose();
  }
  if (forceMount) {
    $$payload.out += "<!--[-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const finalProps = mergeProps(props, { style: contentState.props.style });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: finalProps,
            wrapperProps,
            ...contentState.snippetProps
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...finalProps })}>`;
          children?.($$payload2);
          $$payload2.out += `<!----></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Popper_layer_force_mount($$payload, spread_props([
        mergedProps,
        {
          side,
          enabled: contentState.root.open.current,
          id,
          onInteractOutside: handleInteractOutside,
          onEscapeKeydown: handleEscapeKeydown,
          onOpenAutoFocus: (e) => e.preventDefault(),
          onCloseAutoFocus: (e) => e.preventDefault(),
          trapFocus: false,
          loop: false,
          preventScroll,
          onPlaced: () => contentState.isPositioned = true,
          forceMount: true,
          popper,
          $$slots: { popper: true }
        }
      ]));
    }
  } else {
    $$payload.out += "<!--[!-->";
    if (!forceMount) {
      $$payload.out += "<!--[-->";
      {
        let popper = function($$payload2, { props, wrapperProps }) {
          const finalProps = mergeProps(props, { style: contentState.props.style });
          if (child) {
            $$payload2.out += "<!--[-->";
            child($$payload2, {
              props: finalProps,
              wrapperProps,
              ...contentState.snippetProps
            });
            $$payload2.out += `<!---->`;
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...finalProps })}>`;
            children?.($$payload2);
            $$payload2.out += `<!----></div></div>`;
          }
          $$payload2.out += `<!--]-->`;
        };
        Popper_layer($$payload, spread_props([
          mergedProps,
          {
            side,
            present: contentState.root.open.current,
            id,
            onInteractOutside: handleInteractOutside,
            onEscapeKeydown: handleEscapeKeydown,
            onOpenAutoFocus: (e) => e.preventDefault(),
            onCloseAutoFocus: (e) => e.preventDefault(),
            trapFocus: false,
            loop: false,
            preventScroll,
            onPlaced: () => contentState.isPositioned = true,
            forceMount: false,
            popper,
            $$slots: { popper: true }
          }
        ]));
      }
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Mounted($$payload, $$props) {
  push();
  let { isMounted = false, onMountedChange = noop } = $$props;
  bind_props($$props, { isMounted });
  pop();
}
function Select_item$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    value,
    label = value,
    disabled = false,
    children,
    child,
    onHighlight = noop,
    onUnhighlight = noop,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const itemState = useSelectItem({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    value: box.with(() => value),
    disabled: box.with(() => disabled),
    label: box.with(() => label),
    onHighlight: box.with(() => onHighlight),
    onUnhighlight: box.with(() => onUnhighlight)
  });
  const mergedProps = mergeProps(restProps, itemState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...itemState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload, itemState.snippetProps);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--> `;
  Mounted($$payload, {
    onMountedChange: (m) => {
      itemState.mounted = m;
    }
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
function Select_group($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const groupState = useSelectGroup({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, groupState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Select_group_heading$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const groupHeadingState = useSelectGroupHeading({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, groupHeadingState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Select_viewport($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const viewportState = useSelectViewport({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, viewportState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, { "svelte-uf90i5": true })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Select_scroll_down_button$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let mounted = false;
  const scrollDownButtonState = useSelectScrollDownButton({
    id: box.with(() => id),
    mounted: box.with(() => mounted),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, scrollDownButtonState.props);
  if (scrollDownButtonState.canScrollDown) {
    $$payload.out += "<!--[-->";
    Mounted($$payload, { onMountedChange: (m) => mounted = m });
    $$payload.out += `<!----> `;
    if (child) {
      $$payload.out += "<!--[-->";
      child($$payload, { props: restProps });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
      children?.($$payload);
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Select_scroll_up_button$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let mounted = false;
  const scrollDownButtonState = useSelectScrollUpButton({
    id: box.with(() => id),
    mounted: box.with(() => mounted),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, scrollDownButtonState.props);
  if (scrollDownButtonState.canScrollUp) {
    $$payload.out += "<!--[-->";
    Mounted($$payload, { onMountedChange: (m) => mounted = m });
    $$payload.out += `<!----> `;
    if (child) {
      $$payload.out += "<!--[-->";
      child($$payload, { props: restProps });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
      children?.($$payload);
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Dialog($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop,
    controlledOpen = false,
    children
  } = $$props;
  useDialogRoot({
    variant: box.with(() => "dialog"),
    open: box.with(() => open, (v) => {
      if (controlledOpen) {
        onOpenChange(v);
      } else {
        open = v;
        onOpenChange(v);
      }
    })
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { open });
  pop();
}
function Dialog_close($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    ref = null,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const closeState = useDialogClose({
    variant: box.with(() => "close"),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, closeState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Dialog_content$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    children,
    child,
    ref = null,
    forceMount = false,
    onCloseAutoFocus = noop,
    onEscapeKeydown = noop,
    onInteractOutside = noop,
    trapFocus = true,
    preventScroll = true,
    restoreScrollDelay = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useDialogContent({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  {
    let presence = function($$payload2, { present }) {
      {
        let focusScope = function($$payload3, { props: focusScopeProps }) {
          Escape_layer($$payload3, spread_props([
            mergedProps,
            {
              enabled: present.current,
              onEscapeKeydown: (e) => {
                onEscapeKeydown(e);
                if (e.defaultPrevented) return;
                contentState.root.handleClose();
              },
              children: ($$payload4) => {
                Dismissible_layer($$payload4, spread_props([
                  mergedProps,
                  {
                    enabled: present.current,
                    onInteractOutside: (e) => {
                      onInteractOutside(e);
                      if (e.defaultPrevented) return;
                      contentState.root.handleClose();
                    },
                    children: ($$payload5) => {
                      Text_selection_layer($$payload5, spread_props([
                        mergedProps,
                        {
                          enabled: present.current,
                          children: ($$payload6) => {
                            if (child) {
                              $$payload6.out += "<!--[-->";
                              if (contentState.root.open.current) {
                                $$payload6.out += "<!--[-->";
                                Scroll_lock($$payload6, { preventScroll, restoreScrollDelay });
                              } else {
                                $$payload6.out += "<!--[!-->";
                              }
                              $$payload6.out += `<!--]--> `;
                              child($$payload6, {
                                props: mergeProps(mergedProps, focusScopeProps),
                                ...contentState.snippetProps
                              });
                              $$payload6.out += `<!---->`;
                            } else {
                              $$payload6.out += "<!--[!-->";
                              Scroll_lock($$payload6, { preventScroll });
                              $$payload6.out += `<!----> <div${spread_attributes({
                                ...mergeProps(mergedProps, focusScopeProps)
                              })}>`;
                              children?.($$payload6);
                              $$payload6.out += `<!----></div>`;
                            }
                            $$payload6.out += `<!--]-->`;
                          },
                          $$slots: { default: true }
                        }
                      ]));
                    },
                    $$slots: { default: true }
                  }
                ]));
              },
              $$slots: { default: true }
            }
          ]));
        };
        Focus_scope($$payload2, spread_props([
          {
            loop: true,
            trapFocus: shouldTrapFocus({
              forceMount,
              present: present.current,
              trapFocus,
              open: contentState.root.open.current
            })
          },
          mergedProps,
          {
            onCloseAutoFocus: (e) => {
              onCloseAutoFocus(e);
              if (e.defaultPrevented) return;
              contentState.root.triggerNode?.focus();
            },
            focusScope,
            $$slots: { focusScope: true }
          }
        ]));
      }
    };
    Presence_layer($$payload, spread_props([
      mergedProps,
      {
        forceMount,
        present: contentState.root.open.current || forceMount,
        presence,
        $$slots: { presence: true }
      }
    ]));
  }
  bind_props($$props, { ref });
  pop();
}
function Select($$payload, $$props) {
  push();
  let {
    value = void 0,
    onValueChange = noop,
    name = "",
    disabled = false,
    type,
    open = false,
    onOpenChange = noop,
    loop = false,
    scrollAlignment = "nearest",
    required = false,
    controlledOpen = false,
    controlledValue = false,
    items = [],
    allowDeselect = true,
    children
  } = $$props;
  if (value === void 0) {
    const defaultValue = type === "single" ? "" : [];
    if (controlledValue) {
      onValueChange(defaultValue);
    } else {
      value = defaultValue;
    }
  }
  const rootState = useSelectRoot({
    type,
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange(v);
      }
    }),
    disabled: box.with(() => disabled),
    required: box.with(() => required),
    open: box.with(() => open, (v) => {
      if (controlledOpen) {
        onOpenChange(v);
      } else {
        open = v;
        onOpenChange(v);
      }
    }),
    loop: box.with(() => loop),
    scrollAlignment: box.with(() => scrollAlignment),
    name: box.with(() => name),
    isCombobox: false,
    items: box.with(() => items),
    allowDeselect: box.with(() => allowDeselect)
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Floating_layer($$payload2, {
      children: ($$payload3) => {
        children?.($$payload3);
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    if (Array.isArray(rootState.value.current)) {
      $$payload2.out += "<!--[-->";
      if (rootState.value.current.length) {
        $$payload2.out += "<!--[-->";
        const each_array = ensure_array_like(rootState.value.current);
        $$payload2.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let item = each_array[$$index];
          Select_hidden_input($$payload2, { value: item });
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
      Select_hidden_input($$payload2, {
        get value() {
          return rootState.value.current;
        },
        set value($$value) {
          rootState.value.current = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { value, open });
  pop();
}
function Select_trigger$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    type = "button",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useSelectTrigger({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, triggerState.props, { type });
  $$payload.out += `<!---->`;
  Floating_layer_anchor($$payload, {
    id,
    children: ($$payload2) => {
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, { props: mergedProps });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<button${spread_attributes({ ...mergedProps })}>`;
        children?.($$payload2);
        $$payload2.out += `<!----></button>`;
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
function getRangeStyles(direction, min, max) {
  const styles = {
    position: "absolute"
  };
  if (direction === "lr") {
    styles.left = `${min}%`;
    styles.right = `${max}%`;
  } else if (direction === "rl") {
    styles.right = `${min}%`;
    styles.left = `${max}%`;
  } else if (direction === "bt") {
    styles.bottom = `${min}%`;
    styles.top = `${max}%`;
  } else {
    styles.top = `${min}%`;
    styles.bottom = `${max}%`;
  }
  return styles;
}
function getThumbStyles(direction, thumbPos) {
  const styles = {
    position: "absolute"
  };
  if (direction === "lr") {
    styles.left = `${thumbPos}%`;
    styles.translate = "-50% 0";
  } else if (direction === "rl") {
    styles.right = `${thumbPos}%`;
    styles.translate = "50% 0";
  } else if (direction === "bt") {
    styles.bottom = `${thumbPos}%`;
    styles.translate = "0 50%";
  } else {
    styles.top = `${thumbPos}%`;
    styles.translate = "0 -50%";
  }
  return styles;
}
function getTickStyles(direction, tickPosition, offsetPercentage) {
  const style = {
    position: "absolute"
  };
  if (direction === "lr") {
    style.left = `${tickPosition}%`;
    style.translate = `${offsetPercentage}% 0`;
  } else if (direction === "rl") {
    style.right = `${tickPosition}%`;
    style.translate = `${-offsetPercentage}% 0`;
  } else if (direction === "bt") {
    style.bottom = `${tickPosition}%`;
    style.translate = `0 ${-offsetPercentage}%`;
  } else {
    style.top = `${tickPosition}%`;
    style.translate = `0 ${offsetPercentage}%`;
  }
  return style;
}
function snapValueToStep(value, min, max, step) {
  const remainder = (value - (Number.isNaN(min) ? 0 : min)) % step;
  let snappedValue = Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder;
  if (!Number.isNaN(min)) {
    if (snappedValue < min) {
      snappedValue = min;
    } else if (!Number.isNaN(max) && snappedValue > max) {
      snappedValue = min + Math.floor((max - min) / step) * step;
    }
  } else if (!Number.isNaN(max) && snappedValue > max) {
    snappedValue = Math.floor(max / step) * step;
  }
  const string = step.toString();
  const index = string.indexOf(".");
  const precision = index >= 0 ? string.length - index : 0;
  if (precision > 0) {
    const pow = 10 ** precision;
    snappedValue = Math.round(snappedValue * pow) / pow;
  }
  return snappedValue;
}
const SLIDER_ROOT_ATTR = "data-slider-root";
const SLIDER_THUMB_ATTR = "data-slider-thumb";
const SLIDER_RANGE_ATTR = "data-slider-range";
const SLIDER_TICK_ATTR = "data-slider-tick";
class SliderRootState {
  id;
  ref;
  value;
  disabled;
  orientation;
  min;
  max;
  step;
  dir;
  autoSort;
  activeThumb = null;
  isActive = false;
  currentThumbIdx = 0;
  #direction = once(() => {
    if (this.orientation.current === "horizontal") {
      return this.dir.current === "rtl" ? "rl" : "lr";
    } else {
      return this.dir.current === "rtl" ? "tb" : "bt";
    }
  });
  get direction() {
    return this.#direction();
  }
  onValueCommit;
  constructor(props) {
    this.id = props.id;
    this.ref = props.ref;
    this.disabled = props.disabled;
    this.orientation = props.orientation;
    this.min = props.min;
    this.max = props.max;
    this.step = props.step;
    this.dir = props.dir;
    this.autoSort = props.autoSort;
    this.value = props.value;
    this.onValueCommit = props.onValueCommit;
    useRefById({ id: this.id, ref: this.ref });
  }
  applyPosition({ clientXY, activeThumbIdx, start, end }) {
    const min = this.min.current;
    const max = this.max.current;
    const percent = (clientXY - start) / (end - start);
    const val = percent * (max - min) + min;
    if (val < min) {
      this.updateValue(min, activeThumbIdx);
    } else if (val > max) {
      this.updateValue(max, activeThumbIdx);
    } else {
      const step = this.step.current;
      const currStep = Math.floor((val - min) / step);
      const midpointOfCurrStep = min + currStep * step + step / 2;
      const midpointOfNextStep = min + (currStep + 1) * step + step / 2;
      const newValue = val >= midpointOfCurrStep && val < midpointOfNextStep ? (currStep + 1) * step + min : currStep * step + min;
      if (newValue <= max) {
        this.updateValue(newValue, activeThumbIdx);
      }
    }
  }
  #getClosestThumb = (e) => {
    const thumbs = this.getAllThumbs();
    if (!thumbs.length) return;
    for (const thumb of thumbs) {
      thumb.blur();
    }
    const distances = thumbs.map((thumb) => {
      if (this.orientation.current === "horizontal") {
        const { left, right } = thumb.getBoundingClientRect();
        return Math.abs(e.clientX - (left + right) / 2);
      } else {
        const { top, bottom } = thumb.getBoundingClientRect();
        return Math.abs(e.clientY - (top + bottom) / 2);
      }
    });
    const node = thumbs[distances.indexOf(Math.min(...distances))];
    const idx = thumbs.indexOf(node);
    return { node, idx };
  };
  handlePointerMove = (e) => {
    if (!this.isActive || this.disabled.current) return;
    e.preventDefault();
    e.stopPropagation();
    const sliderNode = this.ref.current;
    const activeThumb = this.activeThumb;
    if (!sliderNode || !activeThumb) return;
    activeThumb.node.focus();
    const { left, right, top, bottom } = sliderNode.getBoundingClientRect();
    const direction = this.direction;
    if (direction === "lr") {
      this.applyPosition({
        clientXY: e.clientX,
        activeThumbIdx: activeThumb.idx,
        start: left,
        end: right
      });
    } else if (direction === "rl") {
      this.applyPosition({
        clientXY: e.clientX,
        activeThumbIdx: activeThumb.idx,
        start: right,
        end: left
      });
    } else if (direction === "bt") {
      this.applyPosition({
        clientXY: e.clientY,
        activeThumbIdx: activeThumb.idx,
        start: bottom,
        end: top
      });
    } else if (direction === "tb") {
      this.applyPosition({
        clientXY: e.clientY,
        activeThumbIdx: activeThumb.idx,
        start: top,
        end: bottom
      });
    }
  };
  handlePointerDown = (e) => {
    if (e.button !== 0 || this.disabled.current) return;
    const sliderNode = this.ref.current;
    const closestThumb = this.#getClosestThumb(e);
    if (!closestThumb || !sliderNode) return;
    const target = e.target;
    if (!isElementOrSVGElement(target) || !sliderNode.contains(target)) return;
    e.preventDefault();
    this.activeThumb = closestThumb;
    closestThumb.node.focus();
    this.isActive = true;
    this.handlePointerMove(e);
  };
  handlePointerUp = () => {
    if (this.disabled.current) return;
    if (this.isActive) {
      this.onValueCommit.current(run(() => this.value.current));
    }
    this.isActive = false;
  };
  getPositionFromValue = (thumbValue) => {
    const min = this.min.current;
    const max = this.max.current;
    return (thumbValue - min) / (max - min) * 100;
  };
  getAllThumbs = () => {
    const node = this.ref.current;
    if (!node) return [];
    const thumbs = Array.from(node.querySelectorAll(`[${SLIDER_THUMB_ATTR}]`));
    return thumbs;
  };
  updateValue = (thumbValue, idx) => {
    const currValue = this.value.current;
    if (!currValue.length) {
      this.value.current.push(thumbValue);
      return;
    }
    const valueAtIndex = currValue[idx];
    if (valueAtIndex === thumbValue) return;
    const newValue = [...currValue];
    if (!isValidIndex(idx, newValue)) return;
    const direction = newValue[idx] > thumbValue ? -1 : 1;
    const swap = () => {
      const diffIndex = idx + direction;
      newValue[idx] = newValue[diffIndex];
      newValue[diffIndex] = thumbValue;
      const thumbs = this.getAllThumbs();
      if (!thumbs.length) return;
      thumbs[diffIndex]?.focus();
      this.activeThumb = { node: thumbs[diffIndex], idx: diffIndex };
    };
    if (this.autoSort.current && (direction === -1 && thumbValue < newValue[idx - 1] || direction === 1 && thumbValue > newValue[idx + 1])) {
      swap();
      this.value.current = newValue;
      return;
    }
    const min = this.min.current;
    const max = this.max.current;
    const step = this.step.current;
    newValue[idx] = snapValueToStep(thumbValue, min, max, step);
    this.value.current = newValue;
  };
  #thumbsPropsArr = once(() => {
    const currValue = this.value.current;
    return Array.from({ length: currValue.length || 1 }, (_, i) => {
      const currThumb = run(() => this.currentThumbIdx);
      if (currThumb < currValue.length) {
        run(() => {
          this.currentThumbIdx = currThumb + 1;
        });
      }
      const thumbValue = currValue[i];
      const thumbPosition = this.getPositionFromValue(thumbValue ?? 0);
      const style = getThumbStyles(this.direction, thumbPosition);
      return {
        role: "slider",
        "aria-valuemin": this.min.current,
        "aria-valuemax": this.max.current,
        "aria-valuenow": thumbValue,
        "aria-disabled": getAriaDisabled(this.disabled.current),
        "aria-orientation": getAriaOrientation(this.orientation.current),
        "data-value": thumbValue,
        tabindex: this.disabled.current ? -1 : 0,
        style,
        [SLIDER_THUMB_ATTR]: ""
      };
    });
  });
  get thumbsPropsArr() {
    return this.#thumbsPropsArr();
  }
  #thumbsRenderArr = once(() => {
    return this.thumbsPropsArr.map((_, i) => i);
  });
  get thumbsRenderArr() {
    return this.#thumbsRenderArr();
  }
  #ticksPropsArr = once(() => {
    const max = this.max.current;
    const min = this.min.current;
    const step = this.step.current;
    const difference = max - min;
    let count = Math.ceil(difference / step);
    if (difference % step == 0) {
      count++;
    }
    const currValue = this.value.current;
    return Array.from({ length: count }, (_, i) => {
      const tickPosition = i * (step / difference) * 100;
      const isFirst = i === 0;
      const isLast = i === count - 1;
      const offsetPercentage = isFirst ? 0 : isLast ? -100 : -50;
      const style = getTickStyles(this.direction, tickPosition, offsetPercentage);
      const tickValue = min + i * step;
      const bounded = currValue.length === 1 ? tickValue <= currValue[0] : currValue[0] <= tickValue && tickValue <= currValue[currValue.length - 1];
      return {
        "data-disabled": getDataDisabled(this.disabled.current),
        "data-orientation": getDataOrientation(this.orientation.current),
        "data-bounded": bounded ? "" : void 0,
        "data-value": tickValue,
        style,
        [SLIDER_TICK_ATTR]: ""
      };
    });
  });
  get ticksPropsArr() {
    return this.#ticksPropsArr();
  }
  #ticksRenderArr = once(() => {
    return this.ticksPropsArr.map((_, i) => i);
  });
  get ticksRenderArr() {
    return this.#ticksRenderArr();
  }
  #snippetProps = once(() => ({
    ticks: this.ticksRenderArr,
    thumbs: this.thumbsRenderArr
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #touchAction = once(() => {
    if (this.disabled.current) return void 0;
    return this.orientation.current === "horizontal" ? "pan-y" : "pan-x";
  });
  #props = once(() => ({
    id: this.id.current,
    "data-orientation": getDataOrientation(this.orientation.current),
    "data-disabled": getDataDisabled(this.disabled.current),
    style: { touchAction: this.#touchAction() },
    [SLIDER_ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
const VALID_SLIDER_KEYS = [
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  ARROW_DOWN,
  HOME,
  END
];
class SliderRangeState {
  #id;
  #ref;
  #root;
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.#root = root;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #rangeStyles = once(() => {
    const value = this.#root.value.current;
    const min = value.length > 1 ? this.#root.getPositionFromValue(Math.min(...value) ?? 0) : 0;
    const max = 100 - this.#root.getPositionFromValue(Math.max(...value) ?? 0);
    return {
      position: "absolute",
      ...getRangeStyles(this.#root.direction, min, max)
    };
  });
  get rangeStyles() {
    return this.#rangeStyles();
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-orientation": getDataOrientation(this.#root.orientation.current),
    "data-disabled": getDataDisabled(this.#root.disabled.current),
    style: this.rangeStyles,
    [SLIDER_RANGE_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
class SliderThumbState {
  #id;
  #ref;
  #index;
  #root;
  #isDisabled = once(() => this.#root.disabled.current || this.#root.disabled.current);
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.#root = root;
    this.#index = props.index;
    useRefById({ id: this.#id, ref: this.#ref });
    this.onkeydown = this.onkeydown.bind(this);
  }
  #updateValue(newValue) {
    this.#root.updateValue(newValue, this.#index.current);
  }
  onkeydown(e) {
    if (this.#isDisabled()) return;
    const currNode = this.#ref.current;
    if (!currNode) return;
    const thumbs = this.#root.getAllThumbs();
    if (!thumbs.length) return;
    const idx = thumbs.indexOf(currNode);
    this.#root.currentThumbIdx = idx;
    if (!VALID_SLIDER_KEYS.includes(e.key)) return;
    e.preventDefault();
    const min = this.#root.min.current;
    const max = this.#root.max.current;
    const value = this.#root.value.current;
    const thumbValue = value[idx];
    const orientation = this.#root.orientation.current;
    const direction = this.#root.direction;
    const step = this.#root.step.current;
    switch (e.key) {
      case HOME:
        this.#updateValue(min);
        break;
      case END:
        this.#updateValue(max);
        break;
      case ARROW_LEFT:
        if (orientation !== "horizontal") break;
        if (e.metaKey) {
          const newValue = direction === "rl" ? max : min;
          this.#updateValue(newValue);
        } else if (direction === "rl" && thumbValue < max) {
          this.#updateValue(thumbValue + step);
        } else if (direction === "lr" && thumbValue > min) {
          this.#updateValue(thumbValue - step);
        }
        break;
      case ARROW_RIGHT:
        if (orientation !== "horizontal") break;
        if (e.metaKey) {
          const newValue = direction === "rl" ? min : max;
          this.#updateValue(newValue);
        } else if (direction === "rl" && thumbValue > min) {
          this.#updateValue(thumbValue - step);
        } else if (direction === "lr" && thumbValue < max) {
          this.#updateValue(thumbValue + step);
        }
        break;
      case ARROW_UP:
        if (e.metaKey) {
          const newValue = direction === "tb" ? min : max;
          this.#updateValue(newValue);
        } else if (direction === "tb" && thumbValue > min) {
          this.#updateValue(thumbValue - step);
        } else if (direction !== "tb" && thumbValue < max) {
          this.#updateValue(thumbValue + step);
        }
        break;
      case ARROW_DOWN:
        if (e.metaKey) {
          const newValue = direction === "tb" ? max : min;
          this.#updateValue(newValue);
        } else if (direction === "tb" && thumbValue < max) {
          this.#updateValue(thumbValue + step);
        } else if (direction !== "tb" && thumbValue > min) {
          this.#updateValue(thumbValue - step);
        }
        break;
    }
    this.#root.onValueCommit.current(this.#root.value.current);
  }
  #props = once(() => ({
    ...this.#root.thumbsPropsArr[this.#index.current],
    id: this.#id.current,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
}
const [setSliderRootContext, getSliderRootContext] = createContext("Slider.Root");
function useSliderRoot(props) {
  return setSliderRootContext(new SliderRootState(props));
}
function useSliderRange(props) {
  return new SliderRangeState(props, getSliderRootContext());
}
function useSliderThumb(props) {
  return new SliderThumbState(props, getSliderRootContext());
}
function Slider$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    ref = null,
    value = [],
    onValueChange = noop,
    onValueCommit = noop,
    disabled = false,
    min = 0,
    max = 100,
    step = 1,
    dir = "ltr",
    autoSort = true,
    orientation = "horizontal",
    controlledValue = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useSliderRoot({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange(v);
      }
    }),
    onValueCommit: box.with(() => onValueCommit),
    disabled: box.with(() => disabled),
    min: box.with(() => min),
    max: box.with(() => max),
    step: box.with(() => step),
    dir: box.with(() => dir),
    autoSort: box.with(() => autoSort),
    orientation: box.with(() => orientation)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...rootState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload, rootState.snippetProps);
    $$payload.out += `<!----></span>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, value });
  pop();
}
function Slider_range($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rangeState = useSliderRange({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, rangeState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></span>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Slider_thumb($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    index,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const thumbState = useSliderThumb({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    index: box.with(() => index),
    disabled: box.with(() => disabled)
  });
  const mergedProps = mergeProps(restProps, thumbState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></span>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
const ROOT_ATTR$1 = "data-tabs-root";
const LIST_ATTR = "data-tabs-list";
const TRIGGER_ATTR = "data-tabs-trigger";
const CONTENT_ATTR = "data-tabs-content";
class TabsRootState {
  #id;
  ref;
  orientation;
  loop;
  activationMode;
  value;
  disabled;
  rovingFocusGroup;
  triggerIds = [];
  // holds the trigger ID for each value to associate it with the content
  valueToTriggerId = new SvelteMap();
  // holds the content ID for each value to associate it with the trigger
  valueToContentId = new SvelteMap();
  constructor(props) {
    this.#id = props.id;
    this.ref = props.ref;
    this.orientation = props.orientation;
    this.loop = props.loop;
    this.activationMode = props.activationMode;
    this.value = props.value;
    this.disabled = props.disabled;
    useRefById({ id: this.#id, ref: this.ref });
    this.rovingFocusGroup = useRovingFocus({
      candidateAttr: TRIGGER_ATTR,
      rootNodeId: this.#id,
      loop: this.loop,
      orientation: this.orientation
    });
  }
  registerTrigger(id, value) {
    this.triggerIds.push(id);
    this.valueToTriggerId.set(value, id);
    return () => {
      this.triggerIds = this.triggerIds.filter((triggerId) => triggerId !== id);
      this.valueToTriggerId.delete(value);
    };
  }
  registerContent(id, value) {
    this.valueToContentId.set(value, id);
    return () => {
      this.valueToContentId.delete(value);
    };
  }
  setValue(v) {
    this.value.current = v;
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-orientation": getDataOrientation(this.orientation.current),
    [ROOT_ATTR$1]: ""
  }));
  get props() {
    return this.#props();
  }
}
class TabsListState {
  #id;
  #ref;
  #root;
  #isDisabled = once(() => this.#root.disabled.current);
  constructor(props, root) {
    this.#root = root;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "tablist",
    "aria-orientation": getAriaOrientation(this.#root.orientation.current),
    "data-orientation": getDataOrientation(this.#root.orientation.current),
    [LIST_ATTR]: "",
    "data-disabled": getDataDisabled(this.#isDisabled())
  }));
  get props() {
    return this.#props();
  }
}
class TabsTriggerState {
  #root;
  #id;
  #ref;
  #disabled;
  #value;
  #isActive = once(() => this.#root.value.current === this.#value.current);
  #isDisabled = once(() => this.#disabled.current || this.#root.disabled.current);
  #tabIndex = 0;
  #ariaControls = once(() => this.#root.valueToContentId.get(this.#value.current));
  constructor(props, root) {
    this.#root = root;
    this.#id = props.id;
    this.#ref = props.ref;
    this.#value = props.value;
    this.#disabled = props.disabled;
    useRefById({ id: this.#id, ref: this.#ref });
    this.onfocus = this.onfocus.bind(this);
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
  }
  #activate() {
    if (this.#root.value.current === this.#value.current) return;
    this.#root.setValue(this.#value.current);
  }
  onfocus = (_) => {
    if (this.#root.activationMode.current !== "automatic" || this.#isDisabled()) return;
    this.#activate();
  };
  onclick = (_) => {
    if (this.#isDisabled()) return;
    this.#activate();
  };
  onkeydown = (e) => {
    if (this.#isDisabled()) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.#activate();
      return;
    }
    this.#root.rovingFocusGroup.handleKeydown(this.#ref.current, e);
  };
  #props = once(() => ({
    id: this.#id.current,
    role: "tab",
    "data-state": getTabDataState(this.#isActive()),
    "data-value": this.#value.current,
    "data-orientation": getDataOrientation(this.#root.orientation.current),
    "data-disabled": getDataDisabled(this.#isDisabled()),
    "aria-selected": getAriaSelected(this.#isActive()),
    "aria-controls": this.#ariaControls(),
    [TRIGGER_ATTR]: "",
    disabled: getDisabled(this.#isDisabled()),
    tabindex: this.#tabIndex,
    //
    onclick: this.onclick,
    onfocus: this.onfocus,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
}
class TabsContentState {
  #root;
  #id;
  #ref;
  #value;
  #isActive = once(() => this.#root.value.current === this.#value.current);
  #ariaLabelledBy = once(() => this.#root.valueToTriggerId.get(this.#value.current));
  constructor(props, root) {
    this.#root = root;
    this.#value = props.value;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "tabpanel",
    hidden: getHidden(!this.#isActive()),
    tabindex: 0,
    "data-value": this.#value.current,
    "data-state": getTabDataState(this.#isActive()),
    "aria-labelledby": this.#ariaLabelledBy(),
    [CONTENT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
const [setTabsRootContext, getTabsRootContext] = createContext("Tabs.Root");
function useTabsRoot(props) {
  return setTabsRootContext(new TabsRootState(props));
}
function useTabsTrigger(props) {
  return new TabsTriggerState(props, getTabsRootContext());
}
function useTabsList(props) {
  return new TabsListState(props, getTabsRootContext());
}
function useTabsContent(props) {
  return new TabsContentState(props, getTabsRootContext());
}
function getTabDataState(condition) {
  return condition ? "active" : "inactive";
}
function Tabs($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    value = "",
    onValueChange = noop,
    orientation = "horizontal",
    loop = true,
    activationMode = "automatic",
    disabled = false,
    controlledValue = false,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useTabsRoot({
    id: box.with(() => id),
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange(v);
      }
    }),
    orientation: box.with(() => orientation),
    loop: box.with(() => loop),
    activationMode: box.with(() => activationMode),
    disabled: box.with(() => disabled),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, value });
  pop();
}
function Tabs_content$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    ref = null,
    value,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useTabsContent({
    value: box.with(() => value),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Tabs_list$1($$payload, $$props) {
  push();
  let {
    child,
    children,
    id = useId(),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const listState = useTabsList({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, listState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Tabs_trigger$1($$payload, $$props) {
  push();
  let {
    child,
    children,
    disabled = false,
    id = useId(),
    type = "button",
    value,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useTabsTrigger({
    id: box.with(() => id),
    disabled: box.with(() => disabled ?? false),
    value: box.with(() => value),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, triggerState.props, { type });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
const ROOT_ATTR = "data-toggle-root";
class ToggleRootState {
  #id;
  #ref;
  #disabled;
  pressed;
  constructor(props) {
    this.#disabled = props.disabled;
    this.pressed = props.pressed;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({ id: this.#id, ref: this.#ref });
    this.onclick = this.onclick.bind(this);
  }
  #togglePressed() {
    if (!this.#disabled.current) {
      this.pressed.current = !this.pressed.current;
    }
  }
  onclick(_) {
    if (this.#disabled.current) return;
    this.#togglePressed();
  }
  #props = once(() => ({
    [ROOT_ATTR]: "",
    id: this.#id.current,
    "data-disabled": getDataDisabled(this.#disabled.current),
    "aria-pressed": getAriaPressed(this.pressed.current),
    "data-state": getToggleDataState(this.pressed.current),
    disabled: getDisabled(this.#disabled.current),
    onclick: this.onclick
  }));
  get props() {
    return this.#props();
  }
}
function useToggleRoot(props) {
  return new ToggleRootState(props);
}
function getToggleDataState(condition) {
  return condition ? "on" : "off";
}
function Toggle$1($$payload, $$props) {
  push();
  let {
    ref = null,
    id = useId(),
    pressed = false,
    onPressedChange = noop,
    disabled = false,
    type = "button",
    controlledPressed = false,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const toggleState = useToggleRoot({
    pressed: box.with(() => pressed, (v) => {
      if (controlledPressed) {
        onPressedChange(v);
      } else {
        pressed = v;
        onPressedChange(v);
      }
    }),
    disabled: box.with(() => disabled ?? false),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, toggleState.props, { type });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, {
      props: mergedProps,
      pressed: toggleState.pressed.current
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload, { pressed: toggleState.pressed.current });
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, pressed });
  pop();
}
const toggleVariants = tv({
  base: "ring-offset-background hover:bg-muted hover:text-muted-foreground focus-visible:ring-ring data-[state=on]:bg-accent data-[state=on]:text-accent-foreground inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-transparent",
      outline: "border-input hover:bg-accent hover:text-accent-foreground border bg-transparent"
    },
    size: {
      default: "h-10 min-w-10 px-3",
      sm: "h-9 min-w-9 px-2.5",
      lg: "h-11 min-w-11 px-5"
    }
  },
  defaultVariants: { variant: "default", size: "default" }
});
function Toggle($$payload, $$props) {
  push();
  let {
    ref = null,
    pressed = false,
    class: className,
    size: size2 = "default",
    variant = "default",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Toggle$1($$payload2, spread_props([
      {
        class: cn(toggleVariants({ variant, size: size2, className }))
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        get pressed() {
          return pressed;
        },
        set pressed($$value) {
          pressed = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, pressed });
  pop();
}
function Graph($$payload, $$props) {
  push();
  let { type, data } = $$props;
  if (!data.graphData) {
    data.graphData = [];
  }
  data.graphType = data.graphType || "line";
  function clearData() {
    data.graphData = [];
  }
  let selectedGraphType = data.graphType;
  $$payload.out += `<div class="node overflow-hidden h-[225px] w-[350px]"><div class="flex justify-between border-b px-3 py-1 h-auto draggable"><div class="flex items-center">`;
  Grip_vertical($$payload, { class: "h-5 w-5 mr-2" });
  $$payload.out += `<!----> <small class="text-sm">${escape_html(type)}</small></div> <div class="flex items-center">`;
  Button($$payload, {
    variant: "ghost",
    class: "!h-9 !w-9",
    onclick: clearData,
    children: ($$payload2) => {
      Rotate_ccw($$payload2, { class: "h-4 w-4" });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Toggle($$payload, {
    size: "sm",
    class: "!h-9 !w-9",
    onPressedChange: () => {
      selectedGraphType = selectedGraphType === "line" ? "heatmap" : "line";
    },
    "aria-label": "Toggle italic",
    children: ($$payload2) => {
      if (selectedGraphType === "line") {
        $$payload2.out += "<!--[-->";
        Chart_line($$payload2, { class: "h-4 w-4" });
      } else {
        $$payload2.out += "<!--[!-->";
        if (selectedGraphType === "heatmap") {
          $$payload2.out += "<!--[-->";
          Grid_2x2($$payload2, { class: "h-4 w-4" });
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div> <div class="px-3 pt-2">`;
  if (selectedGraphType === "line") {
    $$payload.out += "<!--[-->";
    Line($$payload, { dataToGraph: data.graphData });
  } else {
    $$payload.out += "<!--[!-->";
    if (selectedGraphType === "heatmap") {
      $$payload.out += "<!--[-->";
      Heatmap($$payload, { data: data.graphData });
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div> `;
  Handle($$payload, { type: "target", position: Position.Left });
  $$payload.out += `<!----></div>`;
  pop();
}
function Context($$payload, $$props) {
  push();
  let { label, children = void 0 } = $$props;
  $$payload.out += `<div class="context"><div${attr("class", `flex items-center border-b px-3 py-2 h-auto draggable svelte-1f8pny6 ${stringify([
    label == "run" || label == "batch" ? "border-gradient" : ""
  ].filter(Boolean).join(" "))}`)}>`;
  Grip_vertical($$payload, { class: "h-5 w-5 mr-2" });
  $$payload.out += `<!----> <small class="text-sm">${escape_html(label)}</small> `;
  children?.($$payload);
  $$payload.out += `<!----></div> `;
  ResizeControl($$payload, {
    minWidth: 250,
    minHeight: 150,
    children: ($$payload2) => {
      $$payload2.out += `<div class="resizer">`;
      Maximize_2($$payload2, { class: "h-3 w-3" });
      $$payload2.out += `<!----></div>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Handle($$payload, { type: "target", position: Position.Left });
  $$payload.out += `<!----></div>`;
  pop();
}
function Loop($$payload, $$props) {
  push();
  let {
    id,
    // Use ID rather than label for uniqueness
    data
  } = $$props;
  let start = data.start;
  let end = data.end;
  Context($$payload, {
    label: id,
    children: ($$payload2) => {
      $$payload2.out += `<div class="ml-2">from <input class="w-6 text-center"${attr("value", start)}> to <input class="w-6 text-center"${attr("value", end)}></div>`;
    },
    $$slots: { default: true }
  });
  pop();
}
function Run($$payload, $$props) {
  push();
  let { data } = $$props;
  data.color = data.color || "rgba(134, 25, 143, 0.3)";
  Context($$payload, { label: "run" });
  pop();
}
function Batch($$payload, $$props) {
  Context($$payload, { label: "batch" });
}
function Tutorial($$payload, $$props) {
  push();
  useSvelteFlow();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<button class="tutorial !w-10 !h-10 rounded-full pulse-ring svelte-e41iku"><div class="w-full text-[#AD8301] h-full flex items-center text-2xl rounded-full justify-center svelte-e41iku">!</div></button>`;
    }
    $$payload2.out += `<!--]--> `;
    {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
const nodeTypes = {
  module: Module,
  batch: Batch,
  loop: Loop,
  run: Run,
  function: Function,
  graph: Graph,
  input: Input$1,
  list: List,
  chat: Chat,
  tutorial: Tutorial
};
function load(project) {
  modelSelector.modelId = project.modelId ? project.modelId : "none";
  clearFunctions();
  defaultFunctions.functions.push(...loadFunctions(project));
  return {
    nodes: writable(project.nodes),
    edges: writable(project.edges),
    initialViewport: project.viewport
  };
}
function clearFunctions() {
  defaultFunctions.functions = defaultFunctions.functions.filter((func) => !func.deletable);
}
const loadFunctions = (project) => {
  const functions = project.nodes.filter(
    (node) => node.type === "function"
  );
  return functions.map((node) => node.data);
};
const defaultEdgeOptions = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 8,
    height: 8
  },
  style: "stroke-width: 2px; stroke: #A3A3A3"
};
function Layout($$payload, $$props) {
  push();
  let { flow, leftSidebar: leftSidebar2, navbar, chatTab: chatTab2 } = $$props;
  $$payload.out += `<main class="layout"><div class="navbar">`;
  navbar($$payload);
  $$payload.out += `<!----></div> <div class="sidebar">`;
  leftSidebar2($$payload);
  $$payload.out += `<!----></div> <div class="flow">`;
  flow($$payload);
  $$payload.out += `<!----></div> `;
  if (chat.isVisible) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="chat">`;
    chatTab2($$payload);
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></main>`;
  pop();
}
const clearParents = (nodes) => {
  return nodes.map((node) => {
    node.data.parents = ["session"];
    return node;
  });
};
function exportGraph(nodes, getIntersectingNodes, toObject) {
  nodes.update((nodes2) => {
    nodes2 = clearParents(nodes2);
    nodes2.map((node) => {
      const intersectingNodes = getIntersectingNodes(
        node,
        false,
        nodes2
      );
      if (intersectingNodes.length >= 1) {
        node.data.parents = node.data.parents.concat(
          intersectingNodes.map((n) => n.id)
        );
      }
      return node;
    });
    return nodes2;
  });
  let graphObject = toObject();
  graphObject.nodes = graphObject.nodes.filter(
    (node) => node.type !== "tutorial"
  );
  return graphObject;
}
function buildNodeLookup(nodes) {
  let nodeLookup = {};
  let nodesList = get$1(nodes);
  for (let node of nodesList) {
    nodeLookup[node.id] = node;
  }
  return nodeLookup;
}
function buildAdjacencyList(edges) {
  let adjacencyList = {};
  const edgesList = get$1(edges);
  for (let edge of edgesList) {
    if (adjacencyList[edge.source]) {
      adjacencyList[edge.source].push(edge.target);
    } else {
      adjacencyList[edge.source] = [edge.target];
    }
  }
  return adjacencyList;
}
function cleanOrder(order, edges) {
  order.shift();
  const updatedOrder = order.filter((nodeId) => !nodeId.startsWith("input"));
  const inputs = order.filter((nodeId) => nodeId.startsWith("input"));
  let adjacencyList = buildAdjacencyList(edges);
  for (let inputId of inputs) {
    let child = adjacencyList[inputId][0];
    updatedOrder.splice(updatedOrder.indexOf(child), 0, inputId);
  }
  return updatedOrder;
}
async function animate(order, nodes, edges) {
  let nodeLookup = buildNodeLookup(nodes);
  order = cleanOrder(order, edges);
  for (let nodeId of order) {
    let originalClass = "";
    nodes.update((nodes2) => {
      const currentNode = nodeLookup[nodeId];
      originalClass = currentNode.class || "";
      currentNode.class = `${originalClass} node-highlighted`.trim();
      return nodes2;
    });
    await sleep(250);
    nodes.update((nodes2) => {
      const currentNode = nodeLookup[nodeId];
      currentNode.class = originalClass;
      return nodes2;
    });
  }
}
function Run_button($$payload, $$props) {
  push();
  const {
    toObject,
    updateNodeData,
    getIntersectingNodes
  } = useSvelteFlow();
  const nodes = useNodes();
  const edges = useEdges();
  async function animateOrder(graphObject) {
    const response = await fetch(`${PUBLIC_BACKEND_URL}/run/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphObject)
    });
    const result = await response.json();
    animate(result.order, nodes, edges);
  }
  async function run2() {
    const graphObject = exportGraph(nodes, getIntersectingNodes, toObject);
    animateOrder(graphObject);
    const response = await fetch(`${PUBLIC_BACKEND_URL}/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphObject)
    });
    const result = await response.json();
    for (const [nodeId, data] of Object.entries(result)) {
      if (nodeId.includes("graph")) {
        updateNodeData(nodeId, { graphData: JSON.parse(data) });
      } else {
        updateNodeData(nodeId, { messages: JSON.parse(data) });
      }
    }
  }
  ControlButton($$payload, {
    onclick: run2,
    class: "bg-gradient hover:brightness-125",
    children: ($$payload2) => {
      Play($$payload2, {});
    },
    $$slots: { default: true }
  });
  pop();
}
function Chat_button($$payload, $$props) {
  push();
  ControlButton($$payload, {
    disabled: !editor.chatNodeExists,
    class: !editor.chatNodeExists ? "disabled" : "",
    children: ($$payload2) => {
      Message_square($$payload2, { class: editor.chatNodeExists ? "" : "text-ui-2" });
    },
    $$slots: { default: true }
  });
  pop();
}
function Proximity_button($$payload, $$props) {
  push();
  ControlButton($$payload, {
    class: "",
    children: ($$payload2) => {
      Plug_zap($$payload2, {});
    },
    $$slots: { default: true }
  });
  pop();
}
function Snap_button($$payload, $$props) {
  push();
  ControlButton($$payload, {
    class: "",
    children: ($$payload2) => {
      Grip($$payload2, {});
    },
    $$slots: { default: true }
  });
  pop();
}
function Toolbar($$payload, $$props) {
  push();
  Controls($$payload, {
    orientation: "vertical",
    position: "bottom-left",
    class: "flex gap-2 bg-card p-2 rounded-lg border",
    children: ($$payload2) => {
      Proximity_button($$payload2);
      $$payload2.out += `<!----> `;
      Chat_button($$payload2);
      $$payload2.out += `<!----> `;
      Snap_button($$payload2);
      $$payload2.out += `<!----> <div class="!border-t pt-2">`;
      Run_button($$payload2);
      $$payload2.out += `<!----></div>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Background($$payload, {
    variant: BackgroundVariant.Dots,
    gap: 30,
    bgColor: "#100F0F"
  });
  $$payload.out += `<!---->`;
  pop();
}
function Block_tab($$payload, $$props) {
  push();
  let { blockGroups } = $$props;
  const each_array = ensure_array_like(blockGroups);
  $$payload.out += `<div><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
    let group2 = each_array[$$index_1];
    const each_array_1 = ensure_array_like(group2.blocks);
    $$payload.out += `<div class="mb-2"><small>${escape_html(group2.title)}</small> <div class="grid grid-cols-2 gap-4 pt-2"><!--[-->`;
    for (let index = 0, $$length2 = each_array_1.length; index < $$length2; index++) {
      let block = each_array_1[index];
      $$payload.out += `<button${attr("class", `p-2 h-10 bg-ui-2 border rounded-md ${stringify(block === "chat" && editor.chatNodeExists ? "opacity-50" : "cursor-grab")}`)}${attr("style", `grid-column-start: ${stringify(index % 2 + 1)};`)}${attr("draggable", !(block === "chat" && editor.chatNodeExists))}${attr("disabled", block === "chat" && editor.chatNodeExists, true)}>${escape_html(block)}</button>`;
    }
    $$payload.out += `<!--]--></div></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function Leaf($$payload, $$props) {
  push();
  let { nLayers, depth, tree = void 0 } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<ul${attr("class", `tree w-full ${stringify(depth === 0 ? "pl-0" : "pl-5")} svelte-1ez6p9d`)}><li${attr("class", `tree w-full ${stringify(depth === 0 ? "!border-none" : "")} svelte-1ez6p9d`)}><button${attr("draggable", true)} class="group svelte-1ez6p9d"><div class="icon-container svelte-1ez6p9d">`;
    if (tree.submodules) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div class="chevron svelte-1ez6p9d">`;
      if (tree.expanded) {
        $$payload2.out += "<!--[-->";
        Chevron_down($$payload2, { size: 12, class: "text-primary" });
      } else {
        $$payload2.out += "<!--[!-->";
        Chevron_right($$payload2, { size: 12, class: "text-primary" });
      }
      $$payload2.out += `<!--]--></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> <div class="grip svelte-1ez6p9d">`;
    Grip_vertical($$payload2, { size: 14, class: "text-gray-400" });
    $$payload2.out += `<!----></div></div> <span class="name svelte-1ez6p9d">${escape_html(tree.name)}</span></button> `;
    if (tree.submodules && tree.expanded) {
      $$payload2.out += "<!--[-->";
      const each_array = ensure_array_like(tree.submodules);
      $$payload2.out += `<div><!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        each_array[i];
        Leaf($$payload2, {
          nLayers,
          depth: depth + 1,
          get tree() {
            return tree.submodules[i];
          },
          set tree($$value) {
            tree.submodules[i] = $$value;
            $$settled = false;
          }
        });
      }
      $$payload2.out += `<!--]--></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></li></ul>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { tree });
  pop();
}
function Skeleton($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes({
    class: cn("bg-muted animate-pulse rounded-md", className),
    ...restProps
  })}></div>`;
  bind_props($$props, { ref });
  pop();
}
function Tree($$payload, $$props) {
  push();
  let tree = {};
  const maxExpandDepth = 3;
  let nLayers = 0;
  async function load2(repoId) {
    tree = {};
    const response = await fetch(`${PUBLIC_BACKEND_URL}/models/load`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repo_id: repoId })
    });
    const result = await response.json();
    let pytree = result["pytree"];
    nLayers = 0;
    trimTree(pytree, null, false, 0);
    tree = pytree;
  }
  function trimTree(tree2, parent = null, isListChild = false, currentDepth = 0) {
    tree2.expanded = currentDepth < maxExpandDepth;
    if (tree2.submodules) {
      if (tree2.type === "ModuleList" && tree2.submodules.length > 0) {
        if (parent && parent.submodules) {
          const index = parent.submodules.indexOf(tree2);
          nLayers = tree2.submodules.length;
          if (index !== -1) parent.submodules[index] = tree2.submodules[0];
        }
        trimTree(tree2.submodules[0], parent, isListChild, currentDepth);
      } else {
        for (const child of tree2.submodules) {
          if (isListChild) child.name = isListChild + child.name;
          trimTree(child, tree2, isListChild, currentDepth + 1);
        }
      }
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div>`;
    if (Object.keys(tree).length === 0) {
      $$payload2.out += "<!--[-->";
      const each_array = ensure_array_like(Array(5));
      $$payload2.out += `<div class="space-y-3 mt-3"><!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        each_array[i];
        Skeleton($$payload2, { class: "h-[20px] w-full bg-ui-2 rounded-md" });
      }
      $$payload2.out += `<!--]--></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
      Leaf($$payload2, {
        nLayers,
        depth: 0,
        get tree() {
          return tree;
        },
        set tree($$value) {
          tree = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]--></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { load: load2 });
  pop();
}
function Select_group_heading($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Select_group_heading$1($$payload2, spread_props([
      {
        class: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Select_item($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    value,
    label,
    children: childrenProp,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    {
      let children = function($$payload3, { selected, highlighted }) {
        $$payload3.out += `<span class="absolute left-2 flex size-3.5 items-center justify-center">`;
        if (selected) {
          $$payload3.out += "<!--[-->";
          Check($$payload3, { class: "size-4" });
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--></span> `;
        if (childrenProp) {
          $$payload3.out += "<!--[-->";
          childrenProp($$payload3, { selected, highlighted });
          $$payload3.out += `<!---->`;
        } else {
          $$payload3.out += "<!--[!-->";
          $$payload3.out += `${escape_html(label || value)}`;
        }
        $$payload3.out += `<!--]-->`;
      };
      Select_item$1($$payload2, spread_props([
        {
          value,
          class: cn("data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)
        },
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          },
          children,
          $$slots: { default: true }
        }
      ]));
    }
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Select_scroll_up_button($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Select_scroll_up_button$1($$payload2, spread_props([
      {
        class: cn("flex cursor-default items-center justify-center py-1", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          Chevron_up($$payload3, { class: "size-4" });
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Select_scroll_down_button($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Select_scroll_down_button$1($$payload2, spread_props([
      {
        class: cn("flex cursor-default items-center justify-center py-1", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          Chevron_down($$payload3, { class: "size-4" });
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Select_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    sideOffset = 4,
    portalProps,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Portal$1($$payload2, spread_props([
      portalProps,
      {
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Select_content$1($$payload3, spread_props([
            {
              sideOffset,
              class: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-popover text-popover-foreground relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className)
            },
            restProps,
            {
              get ref() {
                return ref;
              },
              set ref($$value) {
                ref = $$value;
                $$settled = false;
              },
              children: ($$payload4) => {
                Select_scroll_up_button($$payload4, {});
                $$payload4.out += `<!----> <!---->`;
                Select_viewport($$payload4, {
                  class: cn("h-[var(--bits-select-anchor-height)] w-full min-w-[var(--bits-select-anchor-width)] p-1"),
                  children: ($$payload5) => {
                    children?.($$payload5);
                    $$payload5.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----> `;
                Select_scroll_down_button($$payload4, {});
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            }
          ]));
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Select_trigger($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Select_trigger$1($$payload2, spread_props([
      {
        class: cn("border-input bg-background ring-offset-background data-[placeholder]:text-muted-foreground focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          children?.($$payload3);
          $$payload3.out += `<!----> `;
          Chevron_down($$payload3, { class: "size-4 opacity-50" });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const Root$2 = Select;
const Group = Select_group;
function group($$payload, name, models) {
  $$payload.out += `<!---->`;
  Group($$payload, {
    children: ($$payload2) => {
      const each_array = ensure_array_like(models);
      $$payload2.out += `<!---->`;
      Select_group_heading($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(name)}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let model = each_array[$$index];
        $$payload2.out += `<!---->`;
        Select_item($$payload2, {
          value: model,
          children: ($$payload3) => {
            $$payload3.out += `<!----> ${escape_html(model)}`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!---->`;
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
}
function Model_tab($$payload, $$props) {
  push();
  let tree;
  let baseModels = [];
  let chatModels = [];
  let value = "Select a model";
  function loadModel(newModel) {
    if (!newModel) return;
    tree.load(newModel);
    modelSelector.modelId = newModel;
    modelSelector.isChatModel = chatModels.includes(newModel);
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="mb-2"><!---->`;
    Root$2($$payload2, {
      type: "single",
      onValueChange: (model) => loadModel(model),
      get value() {
        return value;
      },
      set value($$value) {
        value = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        $$payload3.out += `<small>Model</small> <!---->`;
        Select_trigger($$payload3, {
          class: "margin mb-4 mt-2",
          children: ($$payload4) => {
            $$payload4.out += `<!---->${escape_html(value)}`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Select_content($$payload3, {
          children: ($$payload4) => {
            group($$payload4, "Base Models", baseModels);
            $$payload4.out += `<!----> `;
            group($$payload4, "Chat Models", chatModels);
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Tree($$payload2, {});
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function CodeMirror($$payload, $$props) {
  push();
  let classes = fallback($$props["class"], "");
  let value = fallback($$props["value"], "");
  let basic = fallback($$props["basic"], true);
  let lang = fallback($$props["lang"], () => void 0, true);
  let theme = fallback($$props["theme"], () => void 0, true);
  let extensions = fallback($$props["extensions"], () => [], true);
  let useTab = fallback($$props["useTab"], true);
  let tabSize = fallback($$props["tabSize"], 2);
  let styles = fallback($$props["styles"], () => void 0, true);
  let lineWrapping = fallback($$props["lineWrapping"], false);
  let editable = fallback($$props["editable"], true);
  let readonly = fallback($$props["readonly"], false);
  let placeholder$1 = fallback($$props["placeholder"], () => void 0, true);
  let nodebounce = fallback($$props["nodebounce"], false);
  const is_browser = typeof window !== "undefined";
  let view;
  onDestroy(() => view?.destroy());
  function get_base_extensions(basic2, useTab2, tabSize2, lineWrapping2, placeholder2, editable2, readonly2, lang2) {
    const extensions2 = [
      indentUnit.of(" ".repeat(tabSize2)),
      EditorView.editable.of(editable2),
      EditorState.readOnly.of(readonly2)
    ];
    if (basic2) extensions2.push(basicSetup);
    if (useTab2) extensions2.push(keymap.of([indentWithTab]));
    if (placeholder2) extensions2.push(placeholder(placeholder2));
    if (lang2) extensions2.push(lang2);
    if (lineWrapping2) extensions2.push(EditorView.lineWrapping);
    return extensions2;
  }
  function get_theme(theme2, styles2) {
    const extensions2 = [];
    if (styles2) extensions2.push(EditorView.theme(styles2));
    if (theme2) extensions2.push(theme2);
    return extensions2;
  }
  [
    ...get_base_extensions(basic, useTab, tabSize, lineWrapping, placeholder$1, editable, readonly, lang),
    ...get_theme(theme, styles),
    ...extensions
  ];
  if (is_browser) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr("class", `codemirror-wrapper ${stringify(classes)} svelte-nofj9o`)}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${attr("class", `scm-waiting ${stringify(classes)} svelte-nofj9o`)}><div class="scm-waiting__loading scm-loading svelte-nofj9o"><div class="scm-loading__spinner svelte-nofj9o"></div> <p class="scm-loading__text svelte-nofj9o">Loading editor...</p></div> <pre class="scm-pre cm-editor svelte-nofj9o">${escape_html(value)}</pre></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, {
    class: classes,
    value,
    basic,
    lang,
    theme,
    extensions,
    useTab,
    tabSize,
    styles,
    lineWrapping,
    editable,
    readonly,
    placeholder: placeholder$1,
    nodebounce
  });
  pop();
}
function Input($$payload, $$props) {
  push();
  let {
    ref = null,
    value = void 0,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<input${spread_attributes({
    class: cn("border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className),
    value,
    ...restProps
  })}>`;
  bind_props($$props, { ref, value });
  pop();
}
function Badges($$payload, $$props) {
  push();
  let {
    maxBadges = 5,
    badges = void 0,
    typedArgs = void 0,
    useTypedArgs = void 0
  } = $$props;
  let inputValue = "";
  let totalArgs = badges.length + Object.keys(typedArgs).length;
  function handleKeydown(event) {
    let input = inputValue.trim();
    if (event.key === "Enter" && input !== "") {
      event.preventDefault();
      if (useTypedArgs) {
        addTypedArg(input);
      } else {
        addBadge(input);
      }
      inputValue = "";
    }
  }
  function addBadge(text) {
    if (totalArgs < maxBadges && !badges.includes(text)) {
      badges = [...badges, text];
    }
  }
  function removeBadge(badge) {
    badges = badges.filter((b) => b !== badge);
  }
  function addTypedArg(text) {
    if (totalArgs < maxBadges && !Object.keys(typedArgs).includes(text)) {
      typedArgs = { ...typedArgs, [text]: text };
    }
  }
  function removeTypedArg(key2) {
    typedArgs = Object.fromEntries(Object.entries(typedArgs).filter(([k]) => k !== key2));
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const each_array = ensure_array_like(badges);
    const each_array_1 = ensure_array_like(Object.keys(typedArgs));
    $$payload2.out += `<div><div class="flex flex-wrap gap-2">`;
    Input($$payload2, {
      onkeydown: handleKeydown,
      placeholder: "Type and press enter ...",
      disabled: badges.length >= maxBadges,
      class: "my-2",
      get value() {
        return inputValue;
      },
      set value($$value) {
        inputValue = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let badge = each_array[$$index];
      Button($$payload2, {
        size: "xs",
        class: "py-0.5",
        onclick: () => removeBadge(badge),
        children: ($$payload3) => {
          $$payload3.out += `<span class="px-2">${escape_html(badge)}</span> `;
          X($$payload3, { class: "h-3 w-3 mr-1" });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
    }
    $$payload2.out += `<!--]--> <!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let key2 = each_array_1[$$index_1];
      Button($$payload2, {
        size: "xs",
        class: "py-0.5",
        variant: "outline",
        onclick: () => removeTypedArg(key2),
        children: ($$payload3) => {
          $$payload3.out += `<span class="px-2">${escape_html(key2)}</span> `;
          X($$payload3, { class: "h-3 w-3 mr-1" });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
    }
    $$payload2.out += `<!--]--></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { badges, typedArgs, useTypedArgs });
  pop();
}
function Code_editor($$payload, $$props) {
  push();
  let { index = -1, open = void 0 } = $$props;
  let functionName = index !== -1 ? defaultFunctions.functions[index].functionName : "New Function";
  let code = index !== -1 ? defaultFunctions.functions[index].code : "";
  let inputs = index !== -1 ? defaultFunctions.functions[index].inputs : [];
  let typedArgs = index !== -1 ? defaultFunctions.functions[index].typedArgs : {};
  let useTypedArgs = false;
  const clear = () => {
    functionName = "";
    code = "";
    inputs = [];
  };
  const save = () => {
    const fn = {
      functionName,
      inputs,
      code,
      deletable: true,
      typedArgs
    };
    if (index !== -1) {
      defaultFunctions.functions[index] = fn;
    } else {
      defaultFunctions.functions.push(fn);
    }
    clear();
    open = false;
  };
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Input($$payload2, {
      class: "w-[95%]",
      get value() {
        return functionName;
      },
      set value($$value) {
        functionName = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----> <div class="grid grid-cols-5 gap-5"><div class="col-span-4 border-r pr-5"><small class="pb-2">Code</small> `;
    CodeMirror($$payload2, {
      styles: { "&": { maxWidth: "100%", height: "35rem" } },
      lang: python(),
      theme: githubDark,
      get value() {
        return code;
      },
      set value($$value) {
        code = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="flex flex-col justify-between"><div class="col-span-1"><div class="flex items-center justify-between"><small>Inputs (${escape_html(inputs.length + Object.keys(typedArgs).length)}/5)</small> `;
    Toggle($$payload2, {
      class: "w-5 h-8",
      get pressed() {
        return useTypedArgs;
      },
      set pressed($$value) {
        useTypedArgs = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Keyboard($$payload3, { class: "w-4 h-4" });
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div> `;
    Badges($$payload2, {
      maxBadges: 5,
      get badges() {
        return inputs;
      },
      set badges($$value) {
        inputs = $$value;
        $$settled = false;
      },
      get typedArgs() {
        return typedArgs;
      },
      set typedArgs($$value) {
        typedArgs = $$value;
        $$settled = false;
      },
      get useTypedArgs() {
        return useTypedArgs;
      },
      set useTypedArgs($$value) {
        useTypedArgs = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> `;
    Button($$payload2, {
      variant: "secondary",
      onclick: save,
      children: ($$payload3) => {
        $$payload3.out += `<!---->Save`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { open });
  pop();
}
function Dialog_title($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_title$1($$payload2, spread_props([
      {
        class: cn("text-lg font-semibold leading-none tracking-tight", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Dialog_overlay($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_overlay$1($$payload2, spread_props([
      {
        class: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/80", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Dialog_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    portalProps,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Portal($$payload2, spread_props([
      portalProps,
      {
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Dialog_overlay($$payload3, {});
          $$payload3.out += `<!----> <!---->`;
          Dialog_content$1($$payload3, spread_props([
            {
              class: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] bg-background fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg", className)
            },
            restProps,
            {
              get ref() {
                return ref;
              },
              set ref($$value) {
                ref = $$value;
                $$settled = false;
              },
              children: ($$payload4) => {
                children?.($$payload4);
                $$payload4.out += `<!----> <!---->`;
                Dialog_close($$payload4, {
                  class: "ring-offset-background focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none",
                  children: ($$payload5) => {
                    X($$payload5, { class: "size-4" });
                    $$payload5.out += `<!----> <span class="sr-only">Close</span>`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            }
          ]));
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const Root$1 = Dialog;
const Trigger = Dialog_trigger;
const Portal = Portal$1;
function Function_tab($$payload, $$props) {
  push();
  let open = false;
  let openIndex = -1;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Root$1($$payload2, {
      get open() {
        return open;
      },
      set open($$value) {
        open = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        const each_array = ensure_array_like(defaultFunctions.functions);
        $$payload3.out += `<div class="flex justify-between items-center"><small>Functions</small> <!---->`;
        Trigger($$payload3, {
          onclick: () => {
            openIndex = -1;
          },
          children: ($$payload4) => {
            $$payload4.out += `<!---->+`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----></div> <!---->`;
        Dialog_content($$payload3, {
          class: "max-w-[50%]",
          children: ($$payload4) => {
            Code_editor($$payload4, {
              index: openIndex,
              get open() {
                return open;
              },
              set open($$value) {
                open = $$value;
                $$settled = false;
              }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <div class="flex flex-col mt-2 gap-3 mb-1"><!--[-->`;
        for (let index = 0, $$length = each_array.length; index < $$length; index++) {
          each_array[index];
          $$payload3.out += `<div role="button" tabindex="0" class="flex p-2 h-10 bg-ui-2 px-5 justify-between items-center cursor-grab border rounded" draggable="true">${escape_html(defaultFunctions.functions[index].functionName)} <div class="flex items-center">`;
          if (defaultFunctions.functions[index].deletable) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<button type="button">`;
            Pencil($$payload3, { class: "h-4 w-4" });
            $$payload3.out += `<!----></button> <button type="button" class="ml-2">`;
            Trash_2($$payload3, { class: "h-4 w-4" });
            $$payload3.out += `<!----></button>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--></div></div>`;
        }
        $$payload3.out += `<!--]--></div>`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function Tabs_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Tabs_content$1($$payload2, spread_props([
      {
        class: cn("ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Tabs_list($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Tabs_list$1($$payload2, spread_props([
      {
        class: cn("bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Tabs_trigger($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Tabs_trigger$1($$payload2, spread_props([
      {
        class: cn("ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
const Root = Tabs;
function Sidebar($$payload) {
  const control = {
    title: "Control",
    blocks: ["run", "loop", "batch"]
  };
  const data = { title: "Data", blocks: ["input", "list"] };
  const output = {
    title: "Output",
    blocks: ["chat", "graph", "tutorial"]
  };
  const demoBlocks = [control, data, output];
  $$payload.out += `<div class="p-6 h-full bg-card">`;
  Root($$payload, {
    value: "model",
    id: "sidebar",
    children: ($$payload2) => {
      Tabs_list($$payload2, {
        class: "w-full h-12 mb-3",
        children: ($$payload3) => {
          Tabs_trigger($$payload3, {
            value: "model",
            class: "w-full h-full",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Model`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Tabs_trigger($$payload3, {
            value: "blocks",
            class: "w-full h-full",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Blocks`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Tabs_trigger($$payload3, {
            value: "functions",
            class: "w-full h-full",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Functions`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Tabs_content($$payload2, {
        value: "model",
        children: ($$payload3) => {
          Model_tab($$payload3);
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Tabs_content($$payload2, {
        value: "blocks",
        children: ($$payload3) => {
          Block_tab($$payload3, { blockGroups: demoBlocks });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Tabs_content($$payload2, {
        value: "functions",
        children: ($$payload3) => {
          Function_tab($$payload3);
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
}
function Conversation($$payload, $$props) {
  push();
  useSvelteFlow();
  useNodes();
  let messages = [];
  let inputMessage = "";
  let isLoading = false;
  const each_array = ensure_array_like(messages);
  $$payload.out += `<div class="flex flex-col h-full relative"><div class="overflow-y-auto rounded mb-4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let message = each_array[$$index];
    $$payload.out += `<div${attr("class", `mb-2 ${stringify(message.role === "user" ? "text-right" : "")}`)}><span${attr("class", `inline-block px-4 py-2 rounded ${stringify(message.role === "user" ? "bg-ui-2" : "bg-ui-3")}`)}>`;
    if (message.isLoading) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<span class="animate-pulse">...</span>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(message.content)}`;
    }
    $$payload.out += `<!--]--></span></div>`;
  }
  $$payload.out += `<!--]--></div> <div class="flex flex-col absolute bottom-0 left-0 right-0"><textarea placeholder="Type your message..." class="flex-grow px-4 py-2 text-sm border bg-ui-1 rounded resize-none"${attr("disabled", isLoading, true)} rows="3">`;
  const $$body = escape_html(inputMessage);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea> <button class="absolute bottom-2 right-2 w-8 h-8 rounded bg-ui-2 flex items-center justify-center focus:outline-none focus:ring-1"${attr("disabled", isLoading, true)}>`;
  Arrow_up($$payload, { class: "h-5 w-5" });
  $$payload.out += `<!----></button></div></div>`;
  pop();
}
function Completion($$payload, $$props) {
  push();
  let generationText = "";
  let isLoading = false;
  useSvelteFlow();
  useNodes();
  $$payload.out += `<div class="flex flex-col h-full relative"><textarea placeholder="Enter text for completion..." class="flex-grow px-4 py-2 text-sm border bg-ui-1 rounded resize-none h-full font-mono whitespace-pre-wrap"${attr("disabled", isLoading, true)} rows="20">`;
  const $$body = escape_html(generationText);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea> <button class="absolute bottom-2 right-2 w-8 h-8 rounded bg-ui-2 flex items-center justify-center focus:outline-none focus:ring-1"${attr("disabled", isLoading, true)}>`;
  {
    $$payload.out += "<!--[!-->";
    Arrow_up($$payload, { class: "h-5 w-5" });
  }
  $$payload.out += `<!--]--></button></div>`;
  pop();
}
function Slider($$payload, $$props) {
  push();
  let {
    ref = null,
    value = [0],
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    {
      let children = function($$payload3, { thumbs }) {
        const each_array = ensure_array_like(thumbs);
        $$payload3.out += `<span class="bg-secondary relative h-2 w-full grow overflow-hidden rounded-full"><!---->`;
        Slider_range($$payload3, { class: "bg-primary absolute h-full" });
        $$payload3.out += `<!----></span> <!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let thumb = each_array[$$index];
          $$payload3.out += `<!---->`;
          Slider_thumb($$payload3, {
            index: thumb,
            class: "border-primary bg-background ring-offset-background focus-visible:ring-ring block size-5 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          });
          $$payload3.out += `<!---->`;
        }
        $$payload3.out += `<!--]-->`;
      };
      Slider$1($$payload2, spread_props([
        {
          class: cn("relative flex w-full touch-none select-none items-center", className)
        },
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          },
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          },
          children,
          $$slots: { default: true }
        }
      ]));
    }
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, value });
  pop();
}
function Chat_tab($$payload, $$props) {
  push();
  let temperature = [0.5];
  let maxNewTokens = [50];
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<main class="bg-card h-full flex flex-col overflow-scroll"><div class="p-6 border-b h-full">`;
    if (modelSelector.isChatModel) {
      $$payload2.out += "<!--[-->";
      Conversation($$payload2);
    } else {
      $$payload2.out += "<!--[!-->";
      Completion($$payload2);
    }
    $$payload2.out += `<!--]--></div> <div class="h-[20%] p-6"><small class="font-medium">Generation Settings</small> <div class="my-3"><small>Temperature: ${escape_html(temperature[0])}</small> `;
    Slider($$payload2, {
      class: "mt-3",
      max: 1,
      min: 0,
      step: 0.05,
      get value() {
        return temperature;
      },
      set value($$value) {
        temperature = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div> <div class="my-3"><small>Max New Tokens: ${escape_html(maxNewTokens[0])}</small> `;
    Slider($$payload2, {
      class: "mt-3",
      max: 100,
      min: 10,
      step: 10,
      get value() {
        return maxNewTokens;
      },
      set value($$value) {
        maxNewTokens = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `<!----></div></div></main>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function Code_block($$payload, $$props) {
  push();
  hljs.registerLanguage("python", python$1);
  let { code } = $$props;
  const highlightedCode = hljs.highlight(code, { language: "python" }).value;
  $$payload.out += `<div class="relative w-full h-full overflow-scroll">`;
  Button($$payload, {
    variant: "outline",
    size: "icon",
    class: "absolute top-2 right-2 h-8 w-8",
    onclick: () => navigator.clipboard.writeText(code),
    children: ($$payload2) => {
      Clipboard($$payload2, { class: "w-5 h-5" });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <pre class="border rounded-md p-3 text-sm overflow-scroll h-full">
${html(snapshot(highlightedCode))}
</pre></div>`;
  pop();
}
function Export_button($$payload, $$props) {
  push();
  const { toObject, getIntersectingNodes } = useSvelteFlow();
  const nodes = useNodes();
  let open = false;
  let code = "";
  async function exportCode() {
    const graphObject = exportGraph(nodes, getIntersectingNodes, toObject);
    const response = await fetch(`${PUBLIC_BACKEND_URL}/code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphObject)
    });
    const result = await response.json();
    code = result["code"];
    open = true;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Root$1($$payload2, {
      get open() {
        return open;
      },
      set open($$value) {
        open = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        Button($$payload3, {
          onclick: () => exportCode(),
          class: "bg-gradient",
          variant: "outline",
          children: ($$payload4) => {
            $$payload4.out += `<!---->Export `;
            Code($$payload4, { class: "w-5 h-5 ml-2" });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Dialog_content($$payload3, {
          class: "min-w-[30vw] h-[50vh]",
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Dialog_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Export Code`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Code_block($$payload4, { code });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function Save_button($$payload, $$props) {
  push();
  const { toObject, getIntersectingNodes } = useSvelteFlow();
  const nodes = useNodes();
  let code = {};
  function updateIntersections() {
    nodes.update((nodes2) => {
      nodes2 = clearParents(nodes2);
      nodes2.map((node) => {
        const intersectingNodes = getIntersectingNodes(node, false, nodes2);
        if (intersectingNodes.length >= 1) {
          node.data.parents = node.data.parents.concat(intersectingNodes.map((n) => n.id));
        }
        return node;
      });
      return nodes2;
    });
  }
  async function exportGraph2() {
    updateIntersections();
    let graphObject = toObject();
    graphObject["modelId"] = modelSelector.modelId;
    code = JSON.stringify(graphObject, null, 2);
  }
  $$payload.out += `<!---->`;
  Root$1($$payload, {
    onOpenChange: () => exportGraph2(),
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Trigger($$payload2, {
        class: buttonVariants({ variant: "default" }),
        children: ($$payload3) => {
          $$payload3.out += `<!---->Save `;
          Download($$payload3, { class: "w-5 h-5 ml-2" });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Dialog_content($$payload2, {
        class: "min-w-[30vw] h-[50vh]",
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Dialog_title($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->Save`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <div class="h-full w-full overflow-scroll rounded border p-3 relative">`;
          Button($$payload3, {
            variant: "outline",
            size: "icon",
            class: "absolute top-2 right-2 h-8 w-8",
            onclick: () => navigator.clipboard.writeText(code),
            children: ($$payload4) => {
              Clipboard($$payload4, { class: "w-5 h-5" });
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <pre class="whitespace-pre-wrap break-words">${escape_html(code)}</pre></div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  pop();
}
function Navbar($$payload, $$props) {
  let { title } = $$props;
  $$payload.out += `<nav class="h-full w-full flex justify-between items-center px-6 bg-card"><div class="flex items-center gap-4">`;
  Button($$payload, {
    size: "icon",
    variant: "secondary",
    href: "/",
    children: ($$payload2) => {
      Chevron_left($$payload2, { class: "w-5 h-5" });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <input type="text"${attr("value", title)} class="bg-transparent rounded px-2 py-1 text-lg hover:!border"></div> <div class="flex items-center gap-3">`;
  Export_button($$payload);
  $$payload.out += `<!----> `;
  Save_button($$payload);
  $$payload.out += `<!----></div></nav>`;
}
function Drag_and_drop($$payload, $$props) {
  push();
  useSvelteFlow();
  useNodes();
  function onDragOver(event) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  }
  function onDrop(event) {
    event.preventDefault();
    {
      return;
    }
  }
  $$payload.out += `<div></div>`;
  bind_props($$props, { onDragOver, onDrop });
  pop();
}
function Connection($$payload, $$props) {
  push();
  const { getNode, getHandleConnections } = useSvelteFlow();
  const handleConnectStart = (params) => {
    const node = getNode(params.nodeId);
    node?.type;
  };
  const isValidModuleConnection = (sourceId) => {
    const targetLeftConnections = getHandleConnections({
      nodeId: sourceId,
      type: "target",
      id: "left-target"
    });
    const targetRightConnections = getHandleConnections({
      nodeId: sourceId,
      type: "target",
      id: "right-target"
    });
    const sourceLeftConnections = getHandleConnections({
      nodeId: sourceId,
      type: "source",
      id: "left-source"
    });
    const sourceRightConnections = getHandleConnections({
      nodeId: sourceId,
      type: "source",
      id: "right-source"
    });
    return targetLeftConnections.length === 0 && targetRightConnections.length === 0 && sourceLeftConnections.length === 0 && sourceRightConnections.length === 0;
  };
  const checkIsValidConnection = (connection) => {
    if (connection == null) {
      return false;
    }
    if (connection.source === connection.target) {
      return false;
    }
    const sourceNode = getNode(connection.source);
    const targetNode = getNode(connection.target);
    if (!sourceNode?.type || !targetNode?.type) {
      return false;
    }
    if (sourceNode.type === "module") {
      return isValidModuleConnection(sourceNode.id);
    }
    const validConnections = connections[sourceNode.type] || [];
    return validConnections.includes(targetNode.type);
  };
  const handleConnectEnd = () => {
  };
  $$payload.out += `<div></div>`;
  bind_props($$props, {
    handleConnectStart,
    checkIsValidConnection,
    handleConnectEnd
  });
  pop();
}
function Proximity($$payload, $$props) {
  push();
  useNodes();
  useEdges();
  useSvelteFlow();
  function onNodeDrag({ targetNode: node }, checkIsValidConnection) {
    {
      return;
    }
  }
  function onNodeDragStop() {
    {
      return;
    }
  }
  $$payload.out += `<div></div>`;
  bind_props($$props, { onNodeDrag, onNodeDragStop });
  pop();
}
function leftSidebar($$payload) {
  Sidebar($$payload);
}
function chatTab($$payload) {
  Chat_tab($$payload);
}
function Editor($$payload, $$props) {
  push();
  let { project } = $$props;
  let {
    nodes,
    edges,
    initialViewport
    // Ignore initial viewport, using fit view. 
  } = load(project);
  let connectionHandler;
  function navbar($$payload2) {
    Navbar($$payload2, {
      title: project.name === "new" ? "Untitled" : project.name
    });
  }
  function flow($$payload2) {
    SvelteFlow($$payload2, {
      nodes,
      edges,
      fitView: true,
      snapGrid: editor.snapGrid,
      defaultEdgeOptions,
      nodeTypes,
      ondelete: ({ nodes: nodes2, edges: edges2 }) => {
        const hasChatNode = nodes2.some((node) => node.id.includes("chat"));
        if (hasChatNode) {
          editor.chatNodeExists = false;
          chat.isVisible = false;
        }
      },
      onconnectend: () => connectionHandler?.handleConnectEnd(),
      isValidConnection: (connection) => connectionHandler.checkIsValidConnection(connection),
      onconnectstart: (_, params) => connectionHandler.handleConnectStart(params),
      children: ($$payload3) => {
        Toolbar($$payload3);
      },
      $$slots: { default: true }
    });
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>NNterface</title>`;
  });
  SvelteFlowProvider($$payload, {
    children: ($$payload2) => {
      Layout($$payload2, { flow, leftSidebar, navbar, chatTab });
      $$payload2.out += `<!----> `;
      Drag_and_drop($$payload2, {});
      $$payload2.out += `<!----> `;
      Connection($$payload2, {});
      $$payload2.out += `<!----> `;
      Proximity($$payload2, {});
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  pop();
}
function _page($$payload, $$props) {
  let { data } = $$props;
  Editor($$payload, { project: data });
}
export {
  _page as default
};
