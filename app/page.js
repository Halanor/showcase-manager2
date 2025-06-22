import { MongoClient } from 'mongodb';
import Image from 'next/image';
import ShowcaseController from './models/showcases'

export default async function Home() {


    const showcaseController = new ShowcaseController();
    showcaseController.connect();
    showcaseController.add('test');
    showcaseController.close();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className="text-white text-lg">
                    <strong>
                        added{/* Name: {doc.name} {doc.surname} */}
                    </strong>
                </div>
            </main>
        </div>
    );
}