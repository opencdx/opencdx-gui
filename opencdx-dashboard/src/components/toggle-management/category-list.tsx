import React, { useState, useEffect } from 'react';
import { Compress, Expand, KeyboardArrowDown, KeyboardArrowUp, CheckCircle, MiscellaneousServices, HelpOutline, Psychology, VolunteerActivism, Description, DynamicForm, ContentPasteSearch, CreateNewFolder, Sms, PermIdentity, LocalHospital, Public, VideoCall, Inventory2, BarChart, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Card, cn, Switch } from '@nextui-org/react';
import Image from 'next/image';
import { Divider, Input, } from 'ui-library';
import { useToggleStore } from '@/hooks/toggle';
import {
    Autocomplete,
    AutocompleteSection,
    AutocompleteItem
  } from "@nextui-org/autocomplete";

const icons: { [key: string]: React.ReactNode } = {
    'analysis-engine': <MiscellaneousServices className="w-12 h-12 text-[#A1A1AA]" />,
    'client-settings': <Psychology className="w-12 h-12 text-[#A1A1AA]" />,
    'employer-benefits': <VolunteerActivism className="w-12 h-12 text-[#A1A1AA]" />,
    'form-builder': <DynamicForm className="w-12 h-12 text-[#A1A1AA]" />,
    'health-navigator': <ContentPasteSearch className="w-12 h-12 text-[#A1A1AA]" />,
    'medical-records': <CreateNewFolder className="w-12 h-12 text-[#A1A1AA]" />,
    'messaging': <Sms className="w-12 h-12 text-[#A1A1AA]" />,
    'profile': <PermIdentity className="w-12 h-12 text-[#A1A1AA]" />,
    'provider': <LocalHospital className="w-12 h-12 text-[#A1A1AA]" />,
    'public-health-reporting': <Public className="w-12 h-12 text-[#A1A1AA]" />,
    'reporting': <BarChart className="w-12 h-12 text-[#A1A1AA]" />,
    'telehealth': <VideoCall className="w-12 h-12 text-[#A1A1AA]" />,
    'test-management': <Inventory2 className="w-12 h-12 text-[#A1A1AA]" />,
};

const CategoryList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { toggleData, setToggleEnabled, setDefaultToggleData } = useToggleStore();
    useEffect(() => {
        setDefaultToggleData();
    }, []);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [isAllExpanded, setIsAllExpanded] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(true);
    const [filteredItems, setFilteredItems] = useState<any[]>(toggleData);
    useEffect(() => {
        if (isAllExpanded) {
            setExpandedCategories(toggleData.map(category => category.id));
        } else {
            setExpandedCategories([]);
        }
    }, [isAllExpanded, toggleData]);

    const toggleExpand = (categoryId: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    useEffect(() => {
        setFilteredItems(toggleData);
    }, [toggleData]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setSearchTerm(e.target.value);

        setFilteredItems(toggleData.filter((item) => item.key.toLowerCase().includes(e.target.value.toLowerCase())));

    };
    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId);
        if (!expandedCategories.includes(categoryId)) {
            setExpandedCategories(prev => [...prev, categoryId]);
        }

        // Scroll to the section of the selected category
        setTimeout(() => {
            const categoryElement = document.getElementById(categoryId);
            if (categoryElement) {
                categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 0);
    };

    const handleSubCategoryClick = (subCategoryId: string) => {
        setTimeout(() => {
            const categoryElement = document.getElementById(subCategoryId);
            if (categoryElement) {
                categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
            }
        }, 0);
    };

    return (


        <div className="grid grid-cols-12 gap-0.5 w-full">
            {
                open && (
                    <div className={`col-span-3 bg-[#FFFFFF] rounded-lg shadow-sm font-inter`}>

                        <Card className="p-4">
                            <h2 className="text-base font-bold font-inter mb-2 text-[#001731]">Toggle Categories</h2>

                            <p className="text-xs text-gray-600 mb-4 font-inter leading-5 font-medium">
                                Select a category below to jump to its section or use the Search.
                            </p>

                            <button
                                className="flex items-center gap-2 w-full px-2 text-[#A1A1AA]  "
                                onClick={() => setIsAllExpanded(!isAllExpanded)}
                            >
                                <span className="text-[#A1A1AA]">
                                    {isAllExpanded ? <Compress className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
                                </span>
                                <span className="text-xs font-inter font-medium">{isAllExpanded ? 'Collapse All' : 'Expand All'}</span>
                            </button>

                            <ul className="space-y-0.5 mt-2">
                                {toggleData.map((category) => (
                                    <li key={category.id} className={`rounded-md ${expandedCategories.includes(category.id || '') ? '' : ''}`}>
                                        <button
                                            className={`flex justify-between items-center w-full px-2 hover:border hover:border-[#006FEE] rounded-[8px] transition-colors  
                ${selectedCategory === category.id ? 'bg-[#E4E4E7]' : ''}`}
                                            onClick={() => {
                                                toggleExpand(category.id || '');
                                                handleCategoryClick(category.id || '');
                                            }}
                                        >
                                            <div className="flex items-center gap-1">
                                                <span className={` ${expandedCategories.includes(category.id || '') ? 'text-gray-400' : 'text-gray-400'}`}>
                                                    {expandedCategories.includes(category.id || '')
                                                        ? <KeyboardArrowUp className="w-4 h-4" />
                                                        : <KeyboardArrowDown className="w-4 h-4" />
                                                    }
                                                </span>
                                                <span className={`flex-grow text-[11px] text-[#0066FF] font-medium leading-5 font-inter`}>
                                                    {category.key}
                                                </span>
                                            </div>
                                            {
                                                category.subCategory?.some((item) => item.enabled === true) && (
                                                    <CheckCircle className="w-4 h-4" style={{ color: '#17C964' }} />
                                                )
                                            }

                                        </button>

                                        {expandedCategories.includes(category.id || '') && category.subCategory && (
                                            <ul className="pl-6 py-1">
                                                {category.subCategory.map((item) => (
                                                    <li key={item.id || ''} className="px-1 ml-4 hover:border hover:border-[#006FEE] rounded-[8px] transition-colors" onClick={() => handleSubCategoryClick(item.id || '')}>
                                                        <span className="flex-grow text-[10px] text-[#0066FF] font-medium leading-5 font-inter">
                                                            {item.key}
                                                        </span>

                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                    </div>
                )}

            <div className={`col-span-9`}>

                <Card>
                    {/* <button
                        onClick={() => setOpen(!open)}
                        className={cn(
                            "flex flex-row z-50  ",

                        )}
                    >

                        {open ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </button> */}
                    <div className="p-4">
                        <div  >

                            <div className="flex items-center w-full gap-12 mb-4">
                                <div className="flex items-center justify-between space-between w-full border-b border-[#E4E4E7] pb-2">
                                    <h2 className="text-xl font-bold">Enable or Disable Features</h2>
                                    <HelpOutline className="w-6 h-6" style={{ color: '#006FEE' }} />
                                </div>
                                <Autocomplete
                                    placeholder="Search Toggles"
                                    className="w-[222px]"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    variant="bordered"
                                    defaultItems={toggleData}
                                   
                                >
                                    {(item) => (
                                        <AutocompleteItem key={item.id}>{item.key}</AutocompleteItem>
                                    )}
                                </Autocomplete>
                                {/* <Input placeholder="Search Toggles" className="w-[222px]" value={searchTerm} onChange={handleSearch} variant="bordered" /> */}
                            </div>
                        </div>
                        <div className=" h-full">
                            {filteredItems && filteredItems.map((category, index) => (
                                <div key={index} className="mb-8" id={category.id || ''}>
                                    <div className="flex items-center gap-3 mb-4">
                                        {icons[category.id || '']}
                                        <div>
                                            <h3 className="font-semibold text-[#52525B]">{category.key}</h3>
                                            <p className="text-xs text-[#3F3F46]">{category.description}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {category.subCategory?.map((item: any, itemIndex: number) => (
                                           <>
                                           <div key={item.id || itemIndex} className="flex items-center justify-between p-4 ml-20" id={item.id || ''}>
                                                <div>
                                                    <h3 className="text-sm font-semibold text-[#52525B] mb-1">{item.key}</h3>
                                                    <p className="text-xs text-[#3F3F46]">{item.description}</p>
                                                </div>
                                                <Switch checked={item.enabled || false}
                                                    defaultSelected={item.enabled || false}
                                                    onChange={(e) => {
                                                        setToggleEnabled(item.id, e.target.checked);
                                                    }}
                                                />
                                            </div>
                                            {
                                                item.subCategory && item.subCategory.map((subItem: any, subItemIndex: number) => (
                                                    <div key={subItem.id || subItemIndex} className="flex items-center justify-between p-4 ml-40" id={subItem.id || ''}>
                                                        <div>
                                                            <h3 className="text-sm font-semibold text-[#52525B] mb-1">{subItem.key}</h3>
                                                            <p className="text-xs text-[#3F3F46]">{subItem.description}</p>
                                                        </div>
                                                        <Switch checked={subItem.enabled || false}
                                                            defaultSelected={subItem.enabled || false}
                                                    onChange={(e) => {
                                                        setToggleEnabled(item.id, e.target.checked);
                                                            }}
                                                        />
                                                    </div>
                                                ))
                                            }
                                            </>
                                        ))}
                                        <Divider />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>

    );
};

export default CategoryList;
