import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "./actions";

export default function ResetPasswordPage() {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <Card>
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <Label htmlFor="email">
                            Email
                        </Label>

                        <Input id="email" className="w-96" type="email" name="email" />

                        <Button className="mt-2" formAction={resetPassword}>Request a password reset</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}