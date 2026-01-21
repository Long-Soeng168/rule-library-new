import StaffCard from '@/components/Card/StaffCard';
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
            <div className="section-container">
                <header className="my-8 text-center">
                    <h1 className="text-3xl font-bold text-foreground md:text-4xl">រចនាសម្ព័ន្ធបណ្ណាល័យ ស.ភ.ន.វ.ស.</h1>
                </header>
                <div className="max-w-full overflow-x-scroll pb-20 text-center">
                    <Tree
                        lineWidth="1px"
                        lineColor="#9ca3af"
                        lineBorderRadius="8px"
                        label={
                            <StyledNode>
                                <StaffCard
                                    name="Dr. Ngann Sundet"
                                    name_kh="បណ្ឌិត ង៉ាន់ ស៊ុនដេត"
                                    role="Managing Director"
                                    imageUrl="/assets/rule_library/profiles/sundet.jpeg"
                                />
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
                                                <StaffCard name="" name_kh="គឹម ច័ន្ទត្រាបុត្រ" role="Technical Librarian" imageUrl="" />
                                            </StyledNode>
                                        }
                                    />
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                <StaffCard name="" name_kh="អ៊ុង សុបញ្ញាម៉ូនិក" role="Administrator" imageUrl="" />
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
                                            <StaffCard name="" name_kh="សេង វណ្ណា" role="Librarian" imageUrl="" />
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                <StaffCard name="" name_kh="លី រ៉ានី" role="Librarian" imageUrl="" />
                                            </StyledNode>
                                        }
                                    />
                                </TreeNode>
                                <TreeNode
                                    label={
                                        <StyledNode>
                                            <StaffCard name="" name_kh="រិន សុទ្ធាលីនណា" role="Librarian" imageUrl="" />
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                <StaffCard name="" name_kh="ជ្រា មុនីនាថ" role="Librarian" imageUrl="" />
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
                                            <StaffCard name="" name_kh="កែ សម្បត្តិនីតា" role="Librarian" imageUrl="" />
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                <StaffCard name="" name_kh="ឈិន ដារិត" role="Librarian" imageUrl="" />
                                            </StyledNode>
                                        }
                                    />
                                </TreeNode>
                                <TreeNode
                                    label={
                                        <StyledNode>
                                            <StaffCard name="" name_kh="ហ៊ាង ចាន់តាលីឡា" role="Librarian" imageUrl="" />
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                <StaffCard name="" name_kh="វ៉ាង រ៉ាវុធ" role="Librarian" imageUrl="" />
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
                                            <StaffCard name="" name_kh="ម៉ៅ បូរ៉ា" role="Librarian" imageUrl="" />
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                <StaffCard
                                                    name="Kim Soreya"
                                                    name_kh="គឹម សូរិយា"
                                                    role="Librarian"
                                                    imageUrl="/assets/rule_library/profiles/kim_soreya.jpg"
                                                />
                                            </StyledNode>
                                        }
                                    />
                                </TreeNode>
                                <TreeNode
                                    label={
                                        <StyledNode>
                                            <StaffCard name="" name_kh="ហេង ណារ័ត្ន" role="Librarian" imageUrl="" />
                                        </StyledNode>
                                    }
                                >
                                    <TreeNode
                                        label={
                                            <StyledNode>
                                                <StaffCard
                                                    name="Long Soeng"
                                                    name_kh="ឡុង សឹង"
                                                    role="Librarian"
                                                    imageUrl="/assets/rule_library/profiles/long_soeng.jpg"
                                                />
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
