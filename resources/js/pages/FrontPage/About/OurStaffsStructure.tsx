import StaffCard from '@/components/Card/StaffCard';
import FrontPageLayout from '@/layouts/FrontPageLayout';
import { Tree, TreeNode } from 'react-organizational-chart';
import { styled } from 'styled-components';

const StyledNode = styled.div`
    padding: 6px 12px;
    border-radius: 8px;
    display: inline-block;
    border: 0px solid #d1d5db;
    background: #fff;
    font-size: 14px;
    min-width: 180px;
    text-align: center;
`;

const OurStaffsStructure = () => {
    return (
        <>
            <div className="section-container pb-10">
                <header className="my-8 text-center">
                    <h1 className="text-3xl font-bold text-foreground md:text-4xl">រចនាសម្ព័ន្ធបណ្ណាល័យ ស.ភ.ន.វ.ស.</h1>
                </header>
                <div className="max-w-full overflow-x-scroll text-center">
                    <Tree
                        lineWidth="2px"
                        lineColor="#9ca3af"
                        lineBorderRadius="10px"
                        label={
                            <StyledNode>
                                <StaffCard name="Dr. Ngann Sundet" role="Managing Director" imageUrl="/assets/rule_library/profiles/sundet.jpeg" />
                            </StyledNode>
                        }
                    >
                        {/* LEVEL 1 Positions */}

                        {/* LEVEL 2 — Libraries under Deputy Director */}
                        <TreeNode
                            label={
                                <TreeNode label>
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                            </StyledNode>
                                        }
                                    />
                                    <TreeNode
                                        label={
                                            <StyledNode className="broder-r bg-black">
                                                {' '}
                                                <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                            </StyledNode>
                                        }
                                    />
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                            </StyledNode>
                                        }
                                    />
                                </TreeNode>
                            }
                        >
                            {/* Law Library */}
                            <TreeNode label={<StyledNode>Law Library</StyledNode>}>
                                <TreeNode
                                    label={
                                        <StyledNode>
                                            {' '}
                                            <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                {' '}
                                                <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                            </StyledNode>
                                        }
                                    />
                                </TreeNode>
                                <TreeNode
                                    label={
                                        <StyledNode>
                                            {' '}
                                            <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                {' '}
                                                <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                            </StyledNode>
                                        }
                                    />
                                </TreeNode>
                            </TreeNode>

                            {/* Economics Library */}
                            <TreeNode label={<StyledNode>Economics Library</StyledNode>}>
                                <TreeNode
                                    label={
                                        <StyledNode>
                                            {' '}
                                            <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                {' '}
                                                <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                            </StyledNode>
                                        }
                                    />
                                </TreeNode>
                                <TreeNode
                                    label={
                                        <StyledNode>
                                            {' '}
                                            <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                {' '}
                                                <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                            </StyledNode>
                                        }
                                    />
                                </TreeNode>
                            </TreeNode>

                            {/* Electronic Library */}
                            <TreeNode label={<StyledNode>Electronic Library</StyledNode>}>
                                <TreeNode
                                    label={
                                        <StyledNode>
                                            {' '}
                                            <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                {' '}
                                                <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                            </StyledNode>
                                        }
                                    />
                                </TreeNode>
                                <TreeNode
                                    label={
                                        <StyledNode>
                                            {' '}
                                            <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                {' '}
                                                <StaffCard name="Staff Name" role="Staff Role" imageUrl={``} />
                                            </StyledNode>
                                        }
                                    />
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </Tree>
                </div>
            </div>
        </>
    );
};

export default OurStaffsStructure;
