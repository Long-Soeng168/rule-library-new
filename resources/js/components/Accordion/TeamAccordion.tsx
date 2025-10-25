import { UserCircle2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../animate-ui/radix/accordion';
import AvatarLogoFallback from '../Avatar/AvatarLogoFallback';
import { Badge } from '../ui/badge';

type TeamMember = {
    name: string;
    role: string;
    image?: string;
    description: string;
};

type TeamAccordionProps = {
    members: TeamMember[];
    multiple?: boolean;
    defaultValue?: string;
};

export const TeamAccordion = ({ members, defaultValue }: TeamAccordionProps) => {
    return (
        <Accordion type="single" defaultValue={defaultValue} collapsible className="my-4 w-full max-w-full gap-0">
            {members.map((member, index) => (
                <AccordionItem
                    key={index}
                    value={`${member.name}`}
                    className="overflow-hidden border border-b-0 px-4 first:rounded-t-md last:rounded-b-md last:border-b"
                >
                    <AccordionTrigger>{member.name}</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex items-center gap-6 rounded-lg sm:mx-0">
                            <AvatarLogoFallback
                                className="mt-1.5 aspect-[3/4] h-auto w-26 shrink-0 rounded-sm bg-muted"
                                imageClassName="size-full object-cover "
                                image={member.image || ''}
                                alt={member.name}
                                fallbackNode={<UserCircle2 className="size-2/5 text-muted-foreground" strokeWidth={1.5} />}
                            />
                            <div className="flex flex-col gap-1">
                                <span className="text-lg font-bold tracking-tight text-foreground">{member.name}</span>
                                <div className='flex gap-2 flex-wrap'>
                                    <Badge variant="secondary" className="text-base rounded font-medium text-foreground">
                                        {member.role}
                                    </Badge>
                                </div>
                                <p className="max-w-[60ch] text-base text-muted-foreground">{member.description}</p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
