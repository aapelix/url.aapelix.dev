import { redirect } from "next/navigation";

export default function Page() {
    redirect("/report/ticket/new");

    return null;
}