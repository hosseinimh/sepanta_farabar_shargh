import React, { useEffect, useState } from "react";

import Table from "../../../components/Table/Table";
import { addCarPage, general ,CarPage} from "../../../constants/strings/fa";
import Operation from "../../../components/Table/Operation";
import { Car } from "../../../http/entities/Car";
import { BASE_PATH } from "../../../constants";

const Cars = () => {
    const car = new Car();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const lastIndex = currentPage * pageSize;
    const firstIndex = lastIndex - pageSize;
    const filterdData = data
        .sort((a, b) => b.id - a.id)
        // .slice(firstIndex, lastIndex);
    const getcars = async () => {
        setLoading(true);
        const result = await car.getAllCars(pageSize, currentPage);
        if (result !== null) {
            setTimeout(() => setLoading(false), 200)
            setData(result.items);
            setCount(result.count);
        }
    };

    useEffect(() => {
        getcars();
    }, []);

    const renderHeader = () => {
        return (
            <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {general.row}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addCarPage.name}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addCarPage.family}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addCarPage.mobile}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {addCarPage.irNo}
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 text-right first:rounded-r-xl last:rounded-l-xl">
                    {general.actions}
                </th>
            </tr>
        );
    };

    const renderItems = () => {
        return filterdData.map((item, index) => {
            return (
                <tr key={index} className="">
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.id}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl">
                        {item.name}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.family}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.mobile}
                    </td>
                    <td className="dark:border-slate-700 p-4 pl-8 first:rounded-r-xl last:rounded-l-xl ">
                        {item.irNo}
                    </td>
                    <Operation link={`${BASE_PATH}/car/edit/${item.id}`} 
                        showLink={`${BASE_PATH}/car/show/${item.id}`}/>
                </tr>
            );
        });
    };

    return (
        <div className="container">
            {data && (
                <div>
                    <Table
                        pageSize={pageSize}
                        renderHeader={renderHeader}
                        renderItems={renderItems}
                        items={data}
                        count={count}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        title={`${CarPage._title}`}
                        subTitle={`${CarPage._subTitle}`}
                        loading={loading}
                    />
                </div>
            )}
        </div>
    );
};

export default Cars;
