import React, { useEffect, useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import useAuth from '../../../../hooks/useAuth';

const FAQ = () => {

    const [faqs, setFAQs] = useState([]);
    const [seeMore, setSeeMore] = useState(false);
    const { toggle } = useAuth();

    useEffect(() => {
        fetch('/faq.json')
            .then(res => res.json())
            .then(data => setFAQs(data));
    }, [])

    const handleFAQ = (id) => {
        const updated = faqs.map(faq =>
            faq.id === id
                ? { ...faq, open: !faq.open }
                : { ...faq, open: false }
        );

        setFAQs(updated);
    };

    return (
        <div className='my-20 md:max-w-275 md:mx-auto mx-4'>
            <h1 className='md:text-3xl text-2xl font-extrabold text-orange-400 text-center'>Frequently Asked Question (FAQ)</h1>
            <p className='text-txt text-center max-w-200 mt-3 mx-auto'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>

            <div className='mt-5'>
                {
                    (!seeMore ? faqs.slice(0, 5) : faqs).map(faq => (
                        <div key={faq.id}
                            onClick={() => {
                                !faq.open && handleFAQ(faq.id);
                            }}
                            className=' mb-5 p-4 rounded-xl'>

                            <div className='flex items-center justify-between'>
                                <div>
                                    <h1 className={`text-xl font-bold ${toggle? 'text-stone-400': 'text-stone-600'}`}>{faq.question}</h1>
                                    <p className={`mt-2 ${!faq.open && "hidden" || "flex"}`}>{faq.answer}</p>
                                </div>
                                <div>
                                    {
                                        faq.open ? <RiArrowDropUpLine size={30} /> : <RiArrowDropDownLine size={30} />
                                    }
                                </div>
                            </div>
                        </div>))
                }
            </div>

            <button onClick={() => setSeeMore(!seeMore)}
                className='btn btn-sm btn-soft btn-warning border border-orange-400 text-[14px] font-bold rounded'>{seeMore ? "See Less FAQ's" : "See More FAQ's"}</button>
        </div>
    );
};

export default FAQ;