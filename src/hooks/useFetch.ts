/*
    The MIT License (MIT)

    Copyright (c) 2020 Julien CARON

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    https://usehooks-typescript.com/react-hook/use-fetch

    Modified from source found here: https://github.com/juliencrn/useHooks.ts

    useFetch is a hook which simplifies a lot of the data fetching process from API resources.
*/
import { useEffect, useReducer, useRef } from 'react';

interface State<T> {
    data?: T;
    loading?: boolean;
    error?: Error;
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
| { type: 'loading'; payload: boolean }
| { type: 'fetched'; payload: T }
| { type: 'error'; payload: Error }

function useFetch<T = unknown>(
    url: string,
    options?: RequestInit,
    useCache = false,
    mock?: T
): State<T> {
    const combinedOptions: RequestInit = {
        ...options,
        headers: {
            Authorization: 'Bearer' + ''
        }
    };

    const cache = useRef<Cache<T>>({});

    // Used to prevent state update if the component is unmounted
    const cancelRequest = useRef<boolean>(false);

    const initialState: State<T> = {
        error: undefined,
        data: undefined,
        loading: undefined
    };

    // Keep state logic separated
    const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
        switch (action.type) {
        case 'loading':
            return { ...initialState, loading: action.payload };
        case 'fetched':
            return { ...initialState, data: action.payload, loading: false };
        case 'error':
            return { ...initialState, error: action.payload, loading: false };
        default:
            return state;
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        if (mock) {
            dispatch({ type: 'fetched', payload: mock });
            return;
        }

        // Do nothing if the url is not given
        if (!url) return;

        const fetchData = async () => {
            dispatch({ type: 'loading', payload: true });

            // If a cache exists for this url, return it
            if (useCache && cache.current[url]) {
                dispatch({ type: 'fetched', payload: cache.current[url] });
                return;
            }

            try {
                const response = await fetch(url, combinedOptions);

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = (await response.json()) as T;

                cache.current[url] = data;

                if (cancelRequest.current) return;

                dispatch({ type: 'fetched', payload: data });
            } catch (error) {
                if (cancelRequest.current) return;

                dispatch({ type: 'error', payload: error as Error });
            }
        }

        // void evaluates this such that we won't be ignoring the promise since it won't return anything
        void fetchData();

        // Use the cleanup function for avoiding a possible state update after the component was unmounted
        return () => {
            cancelRequest.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    return state;
}

export default useFetch;
