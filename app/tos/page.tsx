import Link from "next/link";

export default function Page() {
    return (
        <div className="font-mono flex flex-col w-screen items-center justify-center pb-20 pt-20">
            <Link className="w-1/2 mb-10 text-zinc-400" href="/">← Back</Link>
            <p className="text-6xl font-bold text-center">Terms Of Service</p>
            <div className="w-1/2 mt-10 flex flex-col gap-2">
                <h2 className="text-2xl font-bold mt-5">1. Acceptance of Terms</h2>
                <p>
                    By using aapelix.link, you agree to comply with these Terms of Service. If you do not agree, you may not use the service.
                </p>

                <h2 className="text-2xl font-bold mt-5">2. Prohibited Activities</h2>
                <p>Users are strictly prohibited from using aapelix.link to:</p>
                <ul className="list-disc list-inside">
                    <li>Shorten URLs that link to illegal, harmful, or malicious content.</li>
                    <li>Distribute malware, phishing sites, or other deceptive content.</li>
                    <li>Engage in harassment, hate speech, or promotion of violence.</li>
                    <li>Violate any applicable laws or regulations.</li>
                    <li>Engage in or promote spam.</li>
                </ul>

                <h2 className="text-2xl font-bold mt-5">3. Reporting Abuse</h2>
                <p>
                    If you encounter a shortened URL that violates these Terms of Service, please report it to us immediately by creating a ticket at <Link href="/report/" className="font-bold">aapelix.link/report/</Link> or by emailing {" "}
                    <Link href="mailto:abuse@aapelix.link" className="font-bold">abuse@aapelix.link</Link>. Provide the shortened URL and any relevant details about the abuse.
                </p>

                <h2 className="text-2xl font-bold mt-5">4. Account Suspension</h2>
                <p>
                    aapelix.link reserves the right to suspend or terminate accounts or block and delete URLs without prior notice if we determine there has been a violation of these Terms of Service.
                </p>

                <h2 className="text-2xl font-bold mt-5">5. Limitation of Liability</h2>
                <p>
                    aapelix.link is provided &quot;as is&quot; without any warranties. We are not responsible for the content of shortened URLs or damages resulting from their use.
                </p>

                <h2 className="text-2xl font-bold mt-5">6. Modifications to Terms</h2>
                <p>
                    aapelix.link reserves the right to update these Terms of Service at any time. Continued use of the service constitutes acceptance of any changes.
                </p>

                <h2 className="text-2xl font-bold mt-5">7. Contact Us</h2>
                <p>
                    For questions or concerns about these Terms of Service, contact us at {" "}
                    <Link href="mailto:support@aapelix.link">support@aapelix.link</Link>
                </p>
            </div>
        </div>
    );
}
