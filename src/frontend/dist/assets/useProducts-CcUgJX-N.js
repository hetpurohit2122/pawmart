var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a;
import { n as Subscribable, A as pendingThenable, C as resolveEnabled, s as shallowEqualObjects, D as resolveStaleTime, x as noop, E as environmentManager, F as isValidTimeout, G as timeUntilStale, J as timeoutManager, K as focusManager, M as fetchState, N as replaceData, t as notifyManager, r as reactExports, y as shouldThrowError, w as useQueryClient } from "./index-B0MCdo7A.js";
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
const SAMPLE_PRODUCTS = [
  {
    id: "p1",
    name: "Acme Gourmet Dog Food – Salmon",
    description: "Premium grain-free salmon recipe packed with omega-3 for a healthy coat and strong immune system. Made with real wild-caught salmon and fresh vegetables.",
    price: 48.99,
    originalPrice: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop",
    category: "food",
    petType: "dog",
    brand: "Acme Pet",
    rating: 4.7,
    reviewCount: 124,
    inStock: true,
    tags: ["grain-free", "salmon", "adult"]
  },
  {
    id: "p2",
    name: "BarkBox Durable Chew Toy",
    description: "Ultra-durable natural rubber chew toy designed for aggressive chewers. Satisfies natural chewing instincts while promoting dental health.",
    price: 12.5,
    imageUrl: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400&h=400&fit=crop",
    category: "toys",
    petType: "dog",
    brand: "BarkBox",
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    tags: ["chew", "durable", "dental"]
  },
  {
    id: "p3",
    name: "Plush Velvet Pet Bed – Teal",
    description: "Orthopedic memory foam base with ultra-soft velvet cover. Perfect for dogs and cats who need joint support and a cozy retreat.",
    price: 74.99,
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop",
    category: "accessories",
    petType: "all",
    brand: "CozyPaws",
    rating: 4.8,
    reviewCount: 203,
    inStock: true,
    tags: ["bed", "orthopedic", "velvet"]
  },
  {
    id: "p4",
    name: "Adjustable Leather Dog Leash",
    description: "Genuine full-grain leather leash with brass hardware. Soft on your hands and durable enough for daily walks. Available in multiple lengths.",
    price: 24,
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    category: "belts",
    petType: "dog",
    brand: "EarthBorn",
    rating: 4.6,
    reviewCount: 67,
    inStock: true,
    tags: ["leather", "leash", "adjustable"]
  },
  {
    id: "p5",
    name: "Premium Grain-Free Cat Food",
    description: "High-protein cat food made with real chicken and turkey. No fillers, no artificial colors. Supports lean muscle and digestive health.",
    price: 55.99,
    originalPrice: 64.99,
    imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop",
    category: "food",
    petType: "cat",
    brand: "Purrina",
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    tags: ["grain-free", "chicken", "cat"]
  },
  {
    id: "p6",
    name: "Cozy Fleece Pet Sweater – Teal",
    description: "Soft fleece sweater keeps your pet warm on chilly walks. Machine washable, stretch-fit design with easy slip-on style.",
    price: 21.5,
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
    category: "clothes",
    petType: "dog",
    brand: "PawStyle",
    rating: 4.4,
    reviewCount: 58,
    inStock: true,
    tags: ["sweater", "fleece", "winter"]
  },
  {
    id: "p7",
    name: "Interactive Feather Wand Cat Toy",
    description: "Stimulate your cat's natural hunting instincts with this colorful feather wand. Telescoping handle for extended reach and endless play.",
    price: 9.99,
    imageUrl: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&h=400&fit=crop",
    category: "toys",
    petType: "cat",
    brand: "BarkBox",
    rating: 4.3,
    reviewCount: 145,
    inStock: true,
    tags: ["feather", "wand", "interactive"]
  },
  {
    id: "p8",
    name: "Stainless Steel Pet Bowl Set",
    description: "Double-bowl set with non-slip rubber base. Food-grade stainless steel — dishwasher safe and rust-resistant. Perfect for food and water.",
    price: 18.99,
    imageUrl: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&h=400&fit=crop",
    category: "accessories",
    petType: "all",
    brand: "EarthBorn",
    rating: 4.5,
    reviewCount: 98,
    inStock: true,
    tags: ["bowl", "stainless", "dishwasher-safe"]
  },
  {
    id: "p9",
    name: "Bird Cage Playtop Deluxe",
    description: "Spacious wrought-iron birdcage with built-in play top, multiple perches, and stainless steel food cups. Assembly included.",
    price: 129.99,
    originalPrice: 149.99,
    imageUrl: "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=400&h=400&fit=crop",
    category: "accessories",
    petType: "bird",
    brand: "WingHouse",
    rating: 4.6,
    reviewCount: 41,
    inStock: true,
    tags: ["cage", "bird", "playtop"]
  },
  {
    id: "p10",
    name: "Natural Hemp Dog Collar",
    description: "Eco-friendly hemp collar with brushed nickel buckle and D-ring. Gentle on sensitive skin, available in 5 earthy colors.",
    price: 16.5,
    imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=400&fit=crop",
    category: "belts",
    petType: "dog",
    brand: "EarthBorn",
    rating: 4.7,
    reviewCount: 73,
    inStock: true,
    tags: ["hemp", "eco-friendly", "collar"]
  },
  {
    id: "p11",
    name: "Small Pet Habitat Starter Kit",
    description: "Complete habitat kit for hamsters, gerbils, and mice. Includes wheel, water bottle, hide house, and bedding — everything your small pet needs.",
    price: 44.99,
    imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&h=400&fit=crop",
    category: "accessories",
    petType: "small-pet",
    brand: "MiniPaws",
    rating: 4.4,
    reviewCount: 29,
    inStock: true,
    tags: ["habitat", "hamster", "starter"]
  },
  {
    id: "p12",
    name: "Dog Rain Jacket – Caramel",
    description: "Waterproof yet breathable rain jacket with reflective strips for evening walks. Easy velcro closure, machine washable.",
    price: 34.99,
    originalPrice: 42,
    imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop",
    category: "clothes",
    petType: "dog",
    brand: "PawStyle",
    rating: 4.2,
    reviewCount: 37,
    inStock: true,
    tags: ["jacket", "waterproof", "rain"]
  },
  {
    id: "p13",
    name: "Organic Cat Treats – Tuna Bites",
    description: "100% natural freeze-dried tuna cat treats with no preservatives or additives. Perfect as a reward or meal topper for finicky cats.",
    price: 8.49,
    imageUrl: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=400&fit=crop",
    category: "food",
    petType: "cat",
    brand: "Purrina",
    rating: 4.8,
    reviewCount: 176,
    inStock: true,
    tags: ["treats", "tuna", "organic"]
  },
  {
    id: "p14",
    name: "Dog Puzzle Feeder – Slow Bowl",
    description: "Stimulating puzzle feeder that slows eating, reduces bloat, and entertains your dog. BPA-free, dishwasher safe, works with kibble or wet food.",
    price: 15.99,
    imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop",
    category: "toys",
    petType: "dog",
    brand: "MindPaw",
    rating: 4.6,
    reviewCount: 88,
    inStock: true,
    tags: ["puzzle", "feeder", "slow-eating"]
  },
  {
    id: "p15",
    name: "Premium Cat Collar – Breakaway",
    description: "Safety breakaway buckle collar with engraved ID tag slot. Soft nylon with comfortable fit. Reflective stitching for low-light visibility.",
    price: 11.99,
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop",
    category: "belts",
    petType: "cat",
    brand: "CozyPaws",
    rating: 4.5,
    reviewCount: 54,
    inStock: true,
    tags: ["collar", "breakaway", "reflective"]
  },
  {
    id: "p16",
    name: "Hamster Exercise Wheel – Silent Spinner",
    description: "Whisper-quiet ball-bearing wheel for hamsters and small rodents. Solid running surface prevents foot injuries. Easy to clean.",
    price: 14.5,
    imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&h=400&fit=crop",
    category: "toys",
    petType: "small-pet",
    brand: "MiniPaws",
    rating: 4.7,
    reviewCount: 62,
    inStock: true,
    tags: ["wheel", "hamster", "silent"]
  },
  {
    id: "p17",
    name: "Bird Seed Mix – Premium Blend",
    description: "Nutritious blend of sunflower seeds, millet, safflower, and dried fruit. Formulated for parakeets, cockatiels, and finches.",
    price: 12.99,
    imageUrl: "https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=400&h=400&fit=crop",
    category: "food",
    petType: "bird",
    brand: "WingHouse",
    rating: 4.4,
    reviewCount: 33,
    inStock: true,
    tags: ["seed", "blend", "parakeet"]
  },
  {
    id: "p18",
    name: "Dog Grooming Glove – Deshedding",
    description: "Five-finger design removes loose fur during petting. Works on short and long coats. Machine washable silicone bristles.",
    price: 17,
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    category: "grooming",
    petType: "dog",
    brand: "Acme Pet",
    rating: 4.3,
    reviewCount: 115,
    inStock: true,
    tags: ["grooming", "deshedding", "glove"]
  },
  {
    id: "p19",
    name: "Cat Window Perch – Suction Mount",
    description: "Strong suction cup window seat holds up to 25 lbs. Plush washable cover lets your cat watch the world outside in comfort.",
    price: 27.99,
    originalPrice: 33,
    imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop",
    category: "accessories",
    petType: "cat",
    brand: "CozyPaws",
    rating: 4.5,
    reviewCount: 79,
    inStock: true,
    tags: ["window", "perch", "suction"]
  },
  {
    id: "p20",
    name: "Reflective Dog Harness – No-Pull",
    description: "Front-clip no-pull harness with padded chest plate. Reflective stitching and three adjustment points for a custom, secure fit.",
    price: 29.95,
    imageUrl: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=400&fit=crop",
    category: "accessories",
    petType: "dog",
    brand: "EarthBorn",
    rating: 4.8,
    reviewCount: 192,
    inStock: true,
    tags: ["harness", "no-pull", "reflective"]
  },
  {
    id: "p21",
    name: "Cat Self-Grooming Corner Brush",
    description: "Attach to any wall corner. Flexible bristles give cats the brushing and scratching satisfaction they crave. Infused with catnip.",
    price: 7.99,
    imageUrl: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&h=400&fit=crop",
    category: "grooming",
    petType: "cat",
    brand: "Purrina",
    rating: 4.2,
    reviewCount: 47,
    inStock: true,
    tags: ["grooming", "brush", "catnip"]
  },
  {
    id: "p22",
    name: "Puppy Starter Harness & Leash Set",
    description: "Soft mesh harness and matching leash set designed for puppies 4–15 lbs. Adjustable with quick-release buckle. Comes in 6 color options.",
    price: 19.99,
    originalPrice: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400&h=400&fit=crop",
    category: "belts",
    petType: "dog",
    brand: "PawStyle",
    rating: 4.6,
    reviewCount: 101,
    inStock: true,
    tags: ["puppy", "harness", "set"]
  }
];
function useProducts(filter) {
  return useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 150));
      let results = [...SAMPLE_PRODUCTS];
      if (filter == null ? void 0 : filter.searchQuery) {
        const q = filter.searchQuery.toLowerCase();
        results = results.filter(
          (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
        );
      }
      if ((filter == null ? void 0 : filter.category) && filter.category !== "all") {
        results = results.filter((p) => p.category === filter.category);
      }
      if ((filter == null ? void 0 : filter.petType) && filter.petType !== "all") {
        results = results.filter(
          (p) => p.petType === filter.petType || p.petType === "all"
        );
      }
      if ((filter == null ? void 0 : filter.priceMin) !== void 0) {
        results = results.filter((p) => p.price >= (filter.priceMin ?? 0));
      }
      if ((filter == null ? void 0 : filter.priceMax) !== void 0) {
        results = results.filter((p) => p.price <= (filter.priceMax ?? 999));
      }
      if (filter == null ? void 0 : filter.brand) {
        results = results.filter((p) => p.brand === filter.brand);
      }
      if (filter == null ? void 0 : filter.minRating) {
        results = results.filter((p) => p.rating >= (filter.minRating ?? 0));
      }
      return results;
    },
    staleTime: 6e4
  });
}
function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 100));
      return SAMPLE_PRODUCTS.find((p) => p.id === id);
    },
    enabled: !!id,
    staleTime: 6e4
  });
}
function useAllBrands() {
  return [...new Set(SAMPLE_PRODUCTS.map((p) => p.brand))].sort();
}
export {
  useProducts as a,
  useQuery as b,
  useProduct as c,
  useAllBrands as u
};
