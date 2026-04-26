import ContentListItem from '../partials/ContentListItem'
import Tabs from '../shortcodes/Tabs'

const ContentList = ({ tabs, selectedTab, setSelectedTab, contents }) => {
    return (
    <>   
        {tabs && (    
            <Tabs 
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
        )} 
        <div className="py-3">
            {contents.length > 0 ? contents.map((content, i) => (
                <div key={`key-${i}`} className="col-12 mb-2 px-0 pb-4 border-b-[1px] dark:border-gray-600">
                    <ContentListItem content={content} />
                </div>
            ))
            : (
                <div className="mx-auto text-xl my-36 px-0 pb-4 flex justify-center">
                    <span>No content to display</span>
                </div>
            )} 
        </div>
    </>  
    )
}

export default ContentList