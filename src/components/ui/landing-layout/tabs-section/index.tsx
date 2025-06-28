import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import DashboardDemo from './dashboard'



const TabsSection = () => {
    return (
        <div className='shadow-lg w-screen md:w-full lg:w-full border rounded-lg p-5 bg-card'>
            <Tabs defaultValue="dashboard">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="trades">Trades</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                </TabsList>
                <TabsContent value='overview'>

                </TabsContent>
                <TabsContent value='dashboard'>
                    <DashboardDemo />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default TabsSection
