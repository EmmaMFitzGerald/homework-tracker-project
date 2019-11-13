class HomeworksController < ApplicationController
  before_action :set_homework, only: [:show, :update, :destroy]

  # GET /homeworks
  def index
    render json: Homework.all.to_json( 
    only:[:content, :date, :completion, :id], 
    include: {subject: {only:[:id, :name]}}
    )
  end

  # GET /homeworks/1
  def show
    render json: @homework
  end

  # POST /homeworks
  def create
    subject = Subject.find_or_create_by(subject_params)
    homework = subject.homeworks.build(homework_params)

    if homework.save
      render json: homework.to_json(
        only:[:content, :date, :completion],
        include:{ subject: {only: [:name, :id]}}
      )
    else 
      render json: {error: homework.errors.full_messages}
    end
  end

  # PATCH/PUT /homeworks/1
  def update
    if @homework.update(homework_params)
      render json: @homework
    else
      render json: @homework.errors, status: :unprocessable_entity
    end
  end

  # DELETE /homeworks/1
  def destroy
    @homework.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_homework
      @homework = Homework.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def homework_params
      params.require(:homework).permit(:content, :date, :completion, :id)
    end
    
    def subject_params
      params.require(:subject).permit(:name)
    end
end
