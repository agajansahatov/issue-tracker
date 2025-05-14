import { patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.format(), { status: 400});
    }

    const { title, description, assignedToUserId} = body;
    
    if(assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedToUserId}
        })
        
        if(!user)
            return NextResponse.json({ error: "Invalid user." }, { status: 400 });
    }
    
    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    });

    if(!issue)
        return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: { title, description, assignedToUserId }
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    });

    if(!issue)
        return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

    await prisma.issue.delete({
        where: { id: issue.id }
    });

    return NextResponse.json({});
}