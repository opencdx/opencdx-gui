import { Card, CardBody, BreadcrumbItem, Breadcrumbs, Button, Image, Switch } from 'ui-library';
import { ChevronLeft} from '@mui/icons-material'
import { useRouter } from 'next/navigation';
import editNoteLite from '../../../../public/images/edit_note_lite.png';

const Header = ({formTitle}: {formTitle: string}) => {
    const router = useRouter();

    const handleBack = () => {
        router.push('/pages/form-builder');
    };

    return (
        <div className="h-full">
            <Card className="mb-4 mt-4 p-1 bg-white rounded-lg">
                <CardBody>
                    <div className="flex flex-row justify-between items-center mb-4 mt-4">
                        <div className="flex items-center space-x-4">
                            <Image src={editNoteLite.src} alt="Dynamic Form" width={48} height={48} />
                            <div className="flex flex-col space-y-1">
                                <h1 className="text-xl">
                                    Edit Form: <strong>{formTitle}</strong>
                                </h1>
                                <Breadcrumbs separator="/">
                                    <BreadcrumbItem href="/pages/form-builder">Dashboard</BreadcrumbItem>
                                    <BreadcrumbItem href="/pages/form-builder">Form Builder</BreadcrumbItem>
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
        </div>
    );
};

export { Header };