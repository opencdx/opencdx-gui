import { Card, CardBody, BreadcrumbItem, Breadcrumbs, Button, Image, Switch } from 'ui-library';
import { ChevronLeft} from '@mui/icons-material'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Report } from './report';



const Header = ({formTitle}: {formTitle: string}) => {
    const router = useRouter();
    const [showReport, setShowReport] = useState(false);

    const handleBack = () => {
        router.push('/pages/form-builder');
    };

    return (
        <div className="h-full">
            <Card className="mb-4 mt-4 p-1 bg-white rounded-lg">
                <CardBody>
                    <div className="flex flex-row justify-between items-center mb-4 mt-4">
                        <div className="flex items-center space-x-4">
                            <Image src="/images/edit_note_lite.png" alt="Dynamic Form" width={48} height={48} />
                            <div className="flex flex-col space-y-1">
                                <h1 className="text-xl">
                                    Edit Form: <strong>{formTitle}</strong>
                                </h1>
                                <Breadcrumbs separator="/">
                                    <BreadcrumbItem href="/form-builder">Dashboard</BreadcrumbItem>
                                    <BreadcrumbItem href="/form-builder">Form Builder</BreadcrumbItem>
                                    <BreadcrumbItem>Edit Form: {formTitle}</BreadcrumbItem>
                                </Breadcrumbs>
                            </div>
                        </div>

                        <div className="flex flex-row">
                            <Button
                                className="mr-4"
                                startContent={<ChevronLeft />}
                                variant="bordered"
                                color="primary"
                                onPress={handleBack}
                            >
                                Back
                            </Button>
                            <Button type="submit" variant="solid" color="primary">
                                Submit Form
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Switch
                aria-label="Show Report"
                className="mr-4 mb-4"
                isSelected={showReport}
                onValueChange={setShowReport}
            >
                Show Report
            </Switch>
            {showReport && <Report />}
        </div>
    );
};

export { Header };