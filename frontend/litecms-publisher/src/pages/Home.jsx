import { useState, useEffect } from "react";
import { LoadingSpinner } from "../components/common/LoadingSpinner"
import { Card } from "../components/common/Card";
import DataTable from "react-data-table-component"

import { usePublisherDashboard } from "../hooks/usePublisherDashboard";

const statsCardsCss = [
  {
    key: "totalContent",
    title: "Total Content",
    icon: "fa-layer-group",
    backgroundColor: "bg-primary"
  },
  {
    key: "publishedContent",
    title: "Published Content",
    icon: "fa-globe",
    backgroundColor: "published-content-bg"
  },
  {
    key: "contentThisWeek",
    title: "Content This Week",
    icon: "fa-calendar-week",
    backgroundColor: "content-this-week-bg"
  },
  {
    key: "totalViews",
    title: "Total Views",
    icon: "fa-eye",
    backgroundColor: "total-views-bg"
  },
  {
    key: "totalLikes",
    title: "Total Likes",
    icon: "fa-heart",
    backgroundColor: "total-likes-bg"
  },
  {
    key: "totalComments",
    title: "Total Comments",
    icon: "fa-comments",
    backgroundColor: "total-comments-bg"
  }
];

export function Home() {
    useEffect(() => { 
        document.title = "LiteCMS" 
    }, []);

    const { latestContent, stats, isLoading, loadError} = usePublisherDashboard();

    if(isLoading) { return <LoadingSpinner /> }
    
    if(loadError) { return <LoadError message="Failed to load Page" /> }

    return(
        <div className="right_col">
            <div className="">  
                <div className="page-title">
                    <h4 className="m-0">Content Overview</h4>
                </div>

                <div className="row col-12 gy-4">
                    {stats && statsCardsCss.map((card) => (
                        <Card
                            key={card.key}
                            title={card.title}
                            value={stats[card.key]}
                            icon={card.icon}
                            backgroundColor={card.backgroundColor}
                        />  
                    ))}
                    <div className="clearfix"></div>
                </div>

                <div className="page-title">
                    <h4 className="m-0">Quick Actions</h4>
                </div>

                <div className="row col-12 gy-4">
                    <div className="col-sm-4 col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center flex-column">
                                    <div className="flex-shrink-0 my-3">
                                        <div className="action-avatar-bg text-white rounded-circle d-flex align-items-center justify-content-center avatar-xxl">
                                            <i className="fas fa-newspaper fa-5x"></i>
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <h4 className="text-center m-0">Create Article</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4 col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center flex-column">
                                    <div className="flex-shrink-0 my-3">
                                        <div className="action-avatar-bg text-white rounded-circle d-flex align-items-center justify-content-center avatar-xxl">
                                            <i className="fas fa-images fa-5x"></i>
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <h4 className="text-center m-0">Create Photo Gallery</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4 col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <div className="d-flex align-items-center flex-column">
                                    <div className="flex-shrink-0 my-3">
                                        <div className="action-avatar-bg text-white rounded-circle d-flex align-items-center justify-content-center avatar-xxl">
                                            <i className="fas fa-video fa-5x"></i>
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <h4 className="text-center m-0">Create Video</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>

                <div className="page-title">
                    <h4 className="m-0">Recently Created Content</h4>
                </div>

                <div className="row col-12">
                    <div>
                        <div className="x_panel">
                            <div className="x_title">
                                <h4>Latest Content</h4>
                            </div>
                            <div className="x_content border-bottom border-2">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card-box table-responsive">
                                            <DataTable
                                                id="datatable-responsive"
                                                //columns={columns}
                                                //data={articles}
                                                highlightOnHover
                                                striped
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}