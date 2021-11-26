import dynamic from 'next/dynamic';

const components = {
    TypistSection: dynamic(() => import('./components/TypistSection'))
};

export default components;
