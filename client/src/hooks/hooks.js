import { useEffect, useRef, useState } from "react";

export const fetchData = async (url, method, body) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            console.error('not ok')
        }
        const data = await response.json()
        return data
    }
    catch (error) {
        console.log(error)
    }

};

export const useInfiniteFetching = (url, queries) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [hasNext, setHasNext] = useState(true)

    const fetchInfiteData = async (reset = false) => {
        if (hasNext) {
            if (reset) {
                setData([]);
                setPageNumber(1);
                setHasNext(true);
            }
            else if (data?.length < 1) setIsLoading(true)
            else setIsFetching(true);
            const newData = await fetchData(`${url}?page=${pageNumber}&${queries}`, 'GET')
            if (newData?.data?.length > 0) setData(prev => [...(reset?[]: prev), ...newData?.data])
            else setHasNext(false)
            setIsLoading(false)
            setIsFetching(false)
        }
        else return

    }
    const loadMore = () => {
        if (hasNext) setPageNumber(prev => prev + 1)
        else return;
    }
    useEffect(() => {
        fetchInfiteData()
    }, [pageNumber])

    const refetch = async () => {
        setIsLoading(true)
        await fetchInfiteData(true)
        setIsLoading(false)
    }

    return { data, isLoading, loadMore, isFetching, refetch, hasNext }
}

