from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    HRFlowable,
)


def generate_resume_pdf(resume: dict, output_path: str):
    document = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=15 * mm,
        leftMargin=15 * mm,
        topMargin=12 * mm,
        bottomMargin=12 * mm,
    )

    styles = getSampleStyleSheet()

    section_style = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=12,
        spaceBefore=8,
        spaceAfter=4,
    )

    body_style = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.5,
        leading=11,
        spaceAfter=3,
    )

    bullet_style = ParagraphStyle(
        "Bullet",
        parent=body_style,
        leftIndent=10,
        firstLineIndent=-6,
        spaceAfter=2,
    )

    story = []

    # Document Header
    story.append(
        Paragraph("TAILORED RESUME", section_style)
    )
    story.append(
        HRFlowable(width="100%", thickness=0.5, spaceAfter=5)
    )

    # Professional Summary
    summary = resume.get("professional_summary", "")
    if summary:
        story.append(Paragraph("PROFESSIONAL SUMMARY", section_style))
        story.append(Paragraph(summary, body_style))

    # Skills
    skills = resume.get("skills", [])
    if skills:
        story.append(Paragraph("SKILLS", section_style))
        story.append(Paragraph(" • ".join(skills), body_style))

    # Education
    education = resume.get("education", [])
    if education:
        story.append(Paragraph("EDUCATION", section_style))
        for item in education:
            if isinstance(item, dict):
                edu_text = f"{item.get('degree', '')} — {item.get('institution', '')}"
                if item.get('graduation_year'):
                    edu_text += f" ({item.get('graduation_year')})"
                story.append(Paragraph(f"• {edu_text}", bullet_style))
            else:
                story.append(Paragraph(f"• {item}", bullet_style))

    # Projects
    projects = resume.get("projects", [])
    if projects:
        story.append(Paragraph("PROJECTS", section_style))
        for project in projects:
            if isinstance(project, dict):
                p_name = project.get("name", "")
                p_desc = project.get("description", "")
                story.append(Paragraph(f"<b>{p_name}</b>: {p_desc}", bullet_style))
            else:
                story.append(Paragraph(f"• {project}", bullet_style))

    # Experience
    experience = resume.get("experience", [])
    if experience:
        story.append(Paragraph("EXPERIENCE", section_style))
        for item in experience:
            if isinstance(item, dict):
                title = item.get("title", "")
                company = item.get("company", "")
                comp_str = f" — {company}" if company else ""
                story.append(Paragraph(f"<b>{title}</b>{comp_str}", body_style))
                for bullet in item.get("bullets", []):
                    story.append(Paragraph(f"• {bullet}", bullet_style))
            else:
                story.append(Paragraph(f"• {item}", bullet_style))

    # Certifications
    certifications = resume.get("certifications", [])
    if certifications:
        story.append(Paragraph("CERTIFICATIONS", section_style))
        for certification in certifications:
            story.append(Paragraph(f"• {certification}", bullet_style))

    document.build(story)
    return output_path
